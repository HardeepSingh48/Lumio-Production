import React from 'react'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { createMedia, saveActivityLogsNotification } from '@/lib/queries'
import { Input } from '../ui/input'
import FileUpload from '../global/file-upload'
import { Button } from '../ui/button'

type Props = {
    subaccountId: string
}

 const formSchema = z.object({
    link:z.string().min(1,{message: 'Media file is required'}),
    name:z.string().min(1, {message: 'Name is required'}),
 })

const UploadMediaForm = ({subaccountId}: Props) => {
    const {toast} = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        mode:'onSubmit',
        defaultValues: {
            link: '',
            name: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            const response = await createMedia(subaccountId, values)
            await saveActivityLogsNotification({
                agencyId: undefined,
                description: `Uploaded media file ${response.name}`,
                subaccountId,
            })
            toast({
                title: 'Media file uploaded successfully',
                description: `File has been uploaded to your media bucket.`,
            })
        }
        catch (error) {
            console.error('Error uploading media file:', error)
            toast({
                title: 'Error uploading media file',
                description: 'There was an error uploading your media file. Please try again.',
                variant: 'destructive',
            })
        }
    }


  return (
    <Card className='w-full'>
        <CardHeader>
            <CardTitle>Media Information</CardTitle>
            <CardDescription>
                Please enter the details for your file.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='name'
                    render={({field}) => (
                        <FormItem className='flex-1 mb-4'>
                            <FormLabel>File Name</FormLabel>
                            <FormControl>
                                <Input
                                 placeholder='Your Agency Name'
                                 {...field}
                                 />
                            </FormControl>
                        </FormItem>
                    )}
                
                />
                <FormField 
                control={form.control}
                name='link'
                render={({field}) =>(
                    <FormItem >
                        <FormLabel>Media File</FormLabel>
                        <FormControl>
                            <FileUpload
                              apiEndpoint='subaccountLogo'
                              value={field.value}
                              onChange={field.onChange}
                              />
                        </FormControl>
                    </FormItem>
                )}/>
                <Button 
                    type='submit'
                    className='mt-4'>
                        Upload Media
                    </Button>

                </form>
            </Form>
        </CardContent>
    </Card>
  )
}

export default UploadMediaForm