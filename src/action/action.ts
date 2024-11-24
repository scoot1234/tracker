'use server'
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
  const rawOrddate = formData.get('orddate') as string;
  const rawnric = formData.get('nric') as string;
  const rawrank = formData.get('rank') as string;
  const rawname = formData.get('name') as string;
  if (!rawOrddate || rawOrddate.trim() === '') {
    throw new Error('Valid Date must be inputted');
  }

  if (!rawnric || !rawrank || !rawname) {
    throw new Error('Missing required fields');
  }

  // Check if the date is valid
  const parsedDate = new Date(rawOrddate);
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid Date format');
  }
  // Check if the date format is correct (simple validation)
   const formattedOrddate = new Date(rawOrddate).toISOString(); // Convert to ISO-8601
  const nric = new String
  await prisma.user.create({ 
    data: {
      nric:rawnric,
      rank:rawrank,
      name:rawname,
      orddate: formattedOrddate, // Pass the formatted date
    }
    
  });
  
    revalidatePath("/app")
}
export async function deleteUser(formData: FormData) {
    // Get the nric value from the formData
    const nric = formData.get("nric");
  
    // Check if nric is a string, as FormData.get() could return either a string or a File
    if (typeof nric !== 'string' || !nric) {
      throw new Error('NRIC must be a valid string');
    }
    const user = await prisma.user.findUnique({
      where: { nric }
    });
  
    if (!user) {
      throw new Error(`User with NRIC ${nric} not found`);
    }
  
    // Perform the delete operation
    await prisma.user.delete({
      where: { nric }
    });
  
    // Optionally, revalidate the path to update the UI
    revalidatePath("/app");
  }



