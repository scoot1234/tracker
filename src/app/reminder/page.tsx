import React from 'react'
import Nav from '../navbar/Nav'
import { createUser, deleteUser } from '@/action/action'
import prisma from '@/lib/db'

export default function reminder(){
    return(
        <div>
           <Nav/>
        </div>
    )
}