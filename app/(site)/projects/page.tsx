'use client'

import Link from 'next/link'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import supabase from '../../config/supabaseClient'
import constants from '../../data/constants'
import { cn } from '@/app/lib/utils'
import MyProjects from './my-projects/page'
// import { shortener } from '@/app/lib/utils'


interface Project {
    name: string,
    description: string,
    members_count: number
}

function Projects({ children }: { children: ReactNode }) {


    return (
         <>
            <MyProjects />
         </>
    )
}

export default Projects 