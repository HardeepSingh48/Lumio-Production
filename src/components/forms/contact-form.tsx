import { ContactUserFormSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Loading from '../global/loading'

type Props = {
    title: string
    subTitle: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiCall: (values: z.infer<typeof ContactUserFormSchema>) => any

}

const ContactForm = ({ title, subTitle, apiCall }: Props) => {
    const form = useForm<z.infer<typeof ContactUserFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(ContactUserFormSchema),
        defaultValues: {
            name: '',
            email: '',
        }
    })
    const isLoading = form.formState.isLoading

    return (
        <Card className="max-w-[500px] w-[500px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subTitle}</CardDescription>

            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(apiCall)}
                        className='flex flex-col gap-4'
                    >
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='Email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className='mt-4'
                            type='submit'
                            disabled={isLoading}
                        >
                            {form.formState.isSubmitting ? <Loading /> : 'Get a free quote!'}
                        </Button>
                    </form>
                </Form>
            </CardContent>

        </Card>
    )
}

export default ContactForm