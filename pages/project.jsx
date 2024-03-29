import React, { useState, useEffect } from 'react'
import shallow from 'zustand/shallow'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'

import { useStore } from '../data/store'

import { BsFillPeopleFill } from 'react-icons/bs'
import { BiGitBranch } from 'react-icons/bi'
import { GoTriangleDown } from 'react-icons/go'

import { ScaleLoader, ClipLoader } from 'react-spinners'

import Page from '../components/Page'
import Songs from '../components/Songs'

import DropdownMenu from '../molecules/DropdownMenu'

import  { 
  useProject, 
  useCreateBranch, 
  useDeleteProject,
  useChangeProjectName, 
} from '../hooks/project'
import Clickable from '../molecules/Clickable'
import IconClickable from '../molecules/IconClickable'

//* HEADER COMPONENTS
const BranchSelect = (props) => {
  const { branches, currBranch, setCurrBranch, className } = props
  const items = branches.map(branch => ({
    label: branch.name,
    onClick: () => setCurrBranch(branch.name)
  }))

  return (
    <DropdownMenu 
      className={className}
      items={items}
      label={currBranch}
      icon={<BiGitBranch style={{ marginRight: '5px' }} />}
      showBorder
    />
  )
}

const AddBranchForm = ({ project, sourceBranchName }) => {
  let [newBranchName, setNewBranchName] = useState('')
  let { mutate } = useCreateBranch()
  let branchNames = project.branches.map(branch => branch.name)

  let onSubmit = (e) => {
    e.preventDefault()

    // logic
    if (newBranchName !== '' && !branchNames.includes(newBranchName)) {
      mutate({ 
        newBranchName: newBranchName,
        sourceBranchName: sourceBranchName,
        projId: project.id,
      })
    } else if (newBranchName === '') {
      alert('Branch name cannot be blank.')
    } else if (branchNames.includes(newBranchName)) {
      alert ('That branch already exists in this project.')
    }

    // clear input
    setNewBranchName('')
  }

  return (
    <form
      id='branch-form'
      className='header-item jc-fe mla'
      onSubmit={onSubmit}
    >
      <input 
        id='branch-input'
        className='oval-btn'
        style={{ width:'125px', paddingLeft:'10px', paddingRight:'10px' }}
        placeholder='Add new branch'
        onChange={e => setNewBranchName(e.target.value)}
        value={newBranchName}
      />
    </form>
  )
}

const TitleHeading = props => {
  const { project } = props

  const changeProjectName = useChangeProjectName()
  const deleteProject = useDeleteProject()

  function changeProjName() {
    let newName = prompt('Enter a new project name', project.name)
    if (newName) {
      changeProjectName.mutate({
        id: project.id,
        name: newName
      })
    }
  }

  function deleteProj() {
    deleteProject.mutate({ id: project.id })
  }

  return (
    <div className='df aic header-item' style={{ marginBottom:'10px' }}>
      <h2 
        className='ellipse'
        onClick={changeProjName}
      >{project.name}</h2>
      <DropdownMenu 
        icon={<GoTriangleDown />}
        items={
          [
            {
              label: 'Delete Project',
              onClick: deleteProj
            },
            {
              label: 'Delete Current Branch',
              onClick: () => {} // todo - finish this func
            }
          ]
        }
      />
    </div>
  )
}

//* HEADER
const ProjectHeader = (props) => {
  const { 
    project,
    branchName,
    setCurrBranch,
  } = props

  const [files, setFiles] = useState([])
  const { openModal, setSongsToUpload } = useStore.getState()

  //* open modal and update state
  useEffect(() => {
    if (files.length > 0) {
      openModal('add-songs')
      setSongsToUpload(files)
    }
  }, [files])

  return (
    <div>
      <TitleHeading project={project} />
      <div id='header'>
        <div className='header-item'>
          <input 
            id='file'
            type='file'
            onChange={e => setFiles( Array.from(e.target.files) )}
            accept='.mp3, .wav'
            multiple
          />
          <label htmlFor='file' className='round-btn grow clickable' style={{ border:'solid whitesmoke' }}>
            + Add Songs
          </label>
        </div>
        <IconClickable 
          icon={<BsFillPeopleFill />}
          className='round-btn submit-btn grow header-item'
          handleClick={() => openModal('share-project')}
          label='Share'
          showBorderOnHover
        />
        <BranchSelect 
          className='header-item '
          branches={project.branches} 
          currBranch={branchName}
          setCurrBranch={setCurrBranch}
        />
        <AddBranchForm 
          project={project} 
          sourceBranchName={branchName} 
        />
      </div>
    </div>
  )
}

//* PROJECT
export default function Project({ isShared=false }) { 
  const router = useRouter();
  const projectsSlug = router.query.projectsSlug || [];

  //* get the projectId from url slug
  let projectId = projectsSlug[projectsSlug.length - 1] || null;

  const { data, isError, isLoading, isFetching } = useProject(projectId, isShared)
  const { user, currProject, currBranch, setCurrBranch } = useStore(state => ({
    user: state.user,
    currProject: state.currProject,
    currBranch: state.currBranch,
    setCurrBranch: state.setCurrBranch,
  }), shallow)

  //* reset branch to main when new proj is selected
  useEffect(() => {
    setCurrBranch('main')
  }, [projectId])

  return (
    <Page>
      <ProjectWrapper id={isLoading ? 'loading-project' : 'project'} className='df'>
        {user && 
          <UserMenu>
            {user.username}
            <DropdownMenu 
              icon={<GoTriangleDown />}
              items={
                [
                  {
                    label: 'Profile',
                    onClick: () => {} //todo
                  },
                  {
                    label: 'Settings',
                    onClick: () => router.push('/settings')
                  },
                ]
              }
            />
          </UserMenu>
        }
        {!currProject && !isLoading && <span>No project selected.</span>}
        {isError && <span>Error</span>}
        {isLoading && <ScaleLoader color='whitesmoke' />}
        {data && currProject && 
          <ProjectContainer>
            <ProjectHeader 
              project={data}
              branchName={currBranch}
              setCurrBranch={setCurrBranch}
              isFetching={isFetching}
            />
            <Songs 
              project={data} 
              branchName={currBranch} 
            />
          </ProjectContainer> 
        }
      </ProjectWrapper>
    </Page>
  )
}

const ProjectWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex: 75%;
  height: 90vh;
`;

const ProjectContainer = styled.section`
  height: 100%;
  width: 100%;
  margin-top: 85px;
`;

const UserMenu = styled.div`
  position: absolute; 
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  height: 40px;
  background-color: ${props => props.theme.color3};
`;