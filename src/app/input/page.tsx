import React from 'react'
import Nav from '../navbar/Nav'
import { createUser, deleteUser } from '@/action/action'
import prisma from '@/lib/db'



export default async function input(){
    const users = await prisma.user.findMany();
    function subtractMonths(dateString: string | number | Date, monthsToSubtract: number) {
        const date = new Date(dateString); // Convert the date string to a Date object
        date.setMonth(date.getMonth() - monthsToSubtract); // Subtract months
        return date; // Return the adjusted date
      }
      
      // Helper function to format the date as YYYY-MM-DD
      function formatDate(date: Date) {
        return date.toLocaleDateString();
      }
return(
    <div>
        <Nav/>
        <form style={{marginLeft:'45%',textAlign:'center', marginTop:'30px', border:'1px solid black', width:'300px', height:'300px'}} action={createUser}>
            <label style={{fontSize:'20x'}}>NRIC:</label><br/>
            <input type='text' placeholder='NRIC' name='nric' maxLength={9} style={{border:'1px solid black'}}/><br/>
            <label style={{fontSize:'20px'}}>Rank:</label><br/>
            <input type='text' placeholder='rank' name='rank' maxLength={3} style={{border:'1px solid black'}}/><br/>
            <label style={{fontSize:'20px'}}>Name:</label><br/>
            <input type='text' placeholder='name' name='name' style={{border:'1px solid black'}}/><br/>
            <label style={{fontSize:'20px'}}>ORD Date:</label><br/>
            <input type='date' placeholder='ORD Date' name='orddate' style={{border:'1px solid black'}}/><br/>
            <button style={{border:'1px solid black', width:'75px', borderRadius:'25px', marginTop:'10px', fontSize:'20px'}}>Submit</button>
        </form>
<form action={deleteUser}>
    <input placeholder='NRIC of person to delete' name='nric' style={{border:'1px solid black'}}/>
        <button >Delete</button>
         </form>
        <table style={{width:'100%', border:'1px solid black', marginTop:'5%', tableLayout:'fixed', fontSize:'13px'}} suppressHydrationWarning>
            <tr suppressHydrationWarning>
                <th suppressHydrationWarning style={{border:'1px solid black'}}>S/N</th>
                <th suppressHydrationWarning style={{border:'1px solid black'}}>NRIC</th>
                <th suppressHydrationWarning style={{border:'1px solid black'}}>RANK</th>
                <th suppressHydrationWarning style={{border:'1px solid black'}}>NAME</th>
                <th suppressHydrationWarning style={{border:'1px solid black'}}>ORD DATE</th>
                <th suppressHydrationWarning style={{border:'1px solid black'}}>1ST YR CLOSE</th>
            </tr>
            {users.map((user, index) => (
                <tr key={user.id} suppressHydrationWarning>
                <th style={{ border: '1px solid black' }} suppressHydrationWarning>
                    {index + 1}
                </th>
                <th style={{ border: '1px solid black' }} suppressHydrationWarning>{user.nric}</th>
                <th style={{ border: '1px solid black' }} suppressHydrationWarning>{user.rank}</th>
            <th style={{ border: '1px solid black', wordWrap: 'break-word' }} suppressHydrationWarning>{user.name}</th>
            <th style={{ border: '1px solid black' }} suppressHydrationWarning>{user.orddate
                ? new Date(user.orddate).toLocaleDateString():''}</th>
                  <th style={{ border: '1px solid black' }} suppressHydrationWarning>{user.orddate
                ? formatDate(subtractMonths(user.orddate, 3)) // Subtract 3 months and format the date
                : ''}</th>
        </tr>
))}
        
          
        
    </table> 
   
       
    </div>
)
}