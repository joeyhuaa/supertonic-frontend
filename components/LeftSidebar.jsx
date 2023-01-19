import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BsX } from 'react-icons/bs'

import { COLORS } from '../aesthetics/aesthetics'

import IconClickable from '../molecules/IconClickable'
import Clickable from '../molecules/Clickable'

import { useStore } from '../data/store'
import { 
  useProjects, 
  useCreateProject, 
  useDeleteProject 
} from '../hooks/project'

export default function LeftSidebar() {
  const [currProjId, setCurrProjId] = useState(null)
  const [isHoveringOverDelete, setHoveringOverDelete] = useState(false)

  //* controls which projects are shown on homepage -- solo projects or shared projects
  const [activeTab, setActiveTab] = useState(null)

  const router = useRouter();

  const { currProject } = useStore.getState();

  const { data: projects, isError: projectsError, isLoading: projectsLoading } = useProjects()
  const _createProject = useCreateProject()
  const _deleteProject = useDeleteProject()

  //* get projId from store, set local state
  useEffect(() => {
    if (currProject) {
      setCurrProjId(currProject.id) // local state
    } else if (router.query.projectsSlug) {
      let projId = router.query.projectsSlug[0];
      setCurrProjId(projId) // local state
    } else {
      console.log('currProj cleared from store')
      setCurrProjId(null) // local state
    }
  }, [currProject, router.pathname])

  //* functions
  let selectProject = projectId => {
    if (!isHoveringOverDelete) {
      setCurrProjId(projectId) // local state
    }
  }

  let createProject = () => {
    _createProject.mutate({
      id: `${Date.now()}`,
      name: 'Untitled Project',
    })
  }

  let deleteProject = (projectId) => _deleteProject.mutate({ id: projectId })

  let setTab = tab => {
    if (!activeTab) setActiveTab(tab)
    else if (activeTab === tab) setActiveTab(null)
    else setActiveTab(tab)
  }

  let getProjects = () => {
    if (!activeTab) return projects //all
    else if (activeTab === 'solo-projects') return projects.filter(p => p.users?.length === 1) //solo
    else return projects.filter(p => p.users?.length > 1) //collab
  }

  return (
    <SidebarWrapper id='leftsidebar'>
      <div id='top'>
        <Supertonic>
          <Link href='/projects'>SuperTonic</Link>
        </Supertonic>
        <div className='df'>
          <Tab className='clickable' left={10} onClick={() => setTab('solo-projects')} selected={activeTab==='solo-projects'}>
            Solo Projects
          </Tab>
          <Tab className='clickable' left={150} onClick={() => setTab('collab-projects')} selected={activeTab==='collab-projects'}>
            Collab Projects
          </Tab>
        </div>
      </div>
      <div id='browser'>
        {projectsError && <span>Error.</span>}
        {projectsLoading && <span>Loading...</span>}
        {getProjects() && getProjects().map((proj) => {
          return (
            <Clickable
              key={proj.id}
              isSelected={currProjId === proj.id}
              handleClick={() => {
                router.push(`/projects/${proj.id}`)
                selectProject(proj.id)
              }}
            >
              <div className='project ellipse df aic jc-sb'>
                <span className='fade-right' style={{width:'200px'}}>{proj.name}</span>
                <Link
                  className='delete-proj-btn'
                  href={currProjId === proj.id ? `/projects` : `/projects/${currProjId}`}
                >
                  <IconClickable
                    handleClick={() => deleteProject(proj.id)}
                    onMouseEnter={() => setHoveringOverDelete(true)}
                    onMouseLeave={() => setHoveringOverDelete(false)}
                    icon={<BsX size={20} />}
                  />
                </Link>
              </div>
            </Clickable>
          )
        })}
      </div>
      <button
        onClick={createProject}
        id='new-project-btn'
        className='oval-btn submit-btn grow'
      >New Project</button>
    </SidebarWrapper>
  )
}

const SidebarWrapper = styled.section`
  background-color: ${props => props.theme.color1};
`;

const Supertonic = styled.h1`
  font-size: 35px;
  color: ${props => props.theme.color2};
  text-shadow: 0px 0px 3px whitesmoke;
  margin-bottom: 10px;
  cursor: pointer;

  transition: 0.5s;
  :hover {
    color: ${COLORS.crimson};
    text-shadow: 0px 0px 7px ${COLORS.skyblue};
    transform: scale(1.05);
  }
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  border: solid whitesmoke;
  height: 40px;
  width: 130px;
  font-size: 10pt;
  background-color: ${props => props.selected ? 'whitesmoke' : props.theme.color3};
  color: ${props => props.selected ? 'black' : 'whitesmoke'};
`;