'use server'
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
  const rawOrddate = formData.get('orddate') as string;
  
  // Check if the date format is correct (simple validation)
  const formattedOrddate = new Date(rawOrddate).toISOString(); // Convert to ISO-8601
  
  await prisma.user.create({
    data: {
      nric: formData.get('nric') as string,
      rank: formData.get('rank') as string,
      name: formData.get('name') as string,
      orddate: formattedOrddate, // Pass the formatted date
    }
  });
  
    revalidatePath("/app")
}
export async function deleteUser(formData: FormData) {
    // Get the nric value from the formData
    const nric = formData.get("nric");
  
    // Check if nric is a string, as FormData.get() could return either a string or a File
    if (typeof nric !== 'string') {
      throw new Error('NRIC must be a valid string');
    }
  
    // Perform the delete operation
    await prisma.user.delete({
      where: { nric }
    });
  
    // Optionally, revalidate the path to update the UI
    revalidatePath("/app");
  }



