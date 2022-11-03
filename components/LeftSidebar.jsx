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

  const router = useRouter();

  const { currProject } = useStore.getState();

  const { data: projects, isError: projectsError, isLoading: projectsLoading } = useProjects()
  console.log('projects',projects)
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

  let deleteProject = (projectId) => {
    _deleteProject.mutate({ id: projectId })
  }

  return (
    <SidebarWrapper id='leftsidebar'>
      <div id='top'>
        <Supertonic>
          <Link href='/projects'>SuperTonic</Link>
        </Supertonic>
        <span>My Projects | Shared w/ Me</span>
      </div>
      <div id='browser'>
        {projectsError && <span>Error.</span>}
        {projectsLoading && <span>Loading...</span>}
        {projects?.map((proj) => {
          return (
            <Clickable
              isSelected={currProjId === proj.id}
              handleClick={() => {
                router.push(`/projects/${proj.id}`)
                selectProject(proj.id)
              }}
              key={proj.id}
            >
              <div className='project ellipse df aic jc-sb'>
                <span className='fade-right' style={{width:'170px'}}>{proj.name}</span>
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
      >
        New Project
      </button>
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