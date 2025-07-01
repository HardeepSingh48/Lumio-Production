'use client'
import { Agency } from '@prisma/client'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { NumberInput } from '@tremor/react'
import { v4 } from 'uuid'

import { useRouter } from 'next/navigation'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { useToast } from '../ui/use-toast'

import * as z from 'zod'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import {
    deleteAgency,
    initUser,
    saveActivityLogsNotification,
    updateAgencyDetails,
    updateUserAgency,
    upsertAgency,
} from '@/lib/queries'
import { Button } from '../ui/button'
import Loading from '../global/loading'

type Props = {
    data?: Partial<Agency>
}

const FormSchema = z.object({
    name: z.string().min(2, { message: 'Agency name must be atleast 2 chars.' }),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    whiteLabel: z.boolean(),
    address: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    agencyLogo: z.string().min(1),
})

const AgencyDetails = ({ data }: Props) => {
    const { toast } = useToast()
    const router = useRouter()
    const [deletingAgency, setDeletingAgency] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: data?.name ?? '',
            companyEmail: data?.companyEmail ?? '',
            companyPhone: data?.companyPhone ?? '',
            whiteLabel: data?.whiteLabel ?? false,
            address: data?.address ?? '',
            city: data?.city ?? '',
            zipCode: data?.zipCode ?? '',
            state: data?.state ?? '',
            country: data?.country ?? '',
            agencyLogo: data?.agencyLogo ?? '',
        },
    })
    const isLoading = form.formState.isSubmitting

    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data])

    const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            console.log('Form values on submit:', values);
            console.log("Form field values:");
            Object.entries(values).forEach(([key, value]) => {
                console.log(`${key}:`, typeof value, value);
            });
            let newUserData;
            let customerId;
            if (!data?.id) {
                const bodyData = {
                    email: values.companyEmail,
                    name: values.name,
                    shipping: {
                        address: {
                            city: values.city,
                            country: values.country,
                            line1: values.address,
                            postal_code: values.zipCode,
                            state: values.zipCode,
                        },
                        name: values.name,
                    },
                    address: {
                        city: values.city,
                        country: values.country,
                        line1: values.address,
                        postal_code: values.zipCode,
                        state: values.zipCode,
                    },
                }
            }

            await initUser({
                email: values.companyEmail,
                name: values.name,
                avatarUrl: '', // or pass a real avatar if you have one
                role: 'AGENCY_OWNER'
            })
            //WIP custId
            if (!data?.id) {
                console.log('Submitting agency with:')
                newUserData = await upsertAgency({
                    id: data?.id ? data.id : v4(),
                    address: values.address,
                    agencyLogo: values.agencyLogo,
                    city: values.city,
                    companyPhone: values.companyPhone,
                    country: values.country,
                    name: values.name,
                    state: values.state,
                    whiteLabel: values.whiteLabel,
                    zipCode: values.zipCode,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    companyEmail: values.companyEmail, // <-- THIS LINE IS CRITICAL
                    connectAccountId: '',
                    goal: 5,
                });
                console.log('createdAgency:', newUserData)
                toast({
                    title: 'Created Agency',
                })


                if (newUserData?.id) {
                    await updateUserAgency(newUserData.id)
                    console.log('Updated user with agencyId:', newUserData.id)
                    router.push(`/agency/${newUserData.id}`)
                } else {
                    console.log('No agency created, refreshing...')
                    router.refresh()
                }
                return
            }
        } catch (error) {
            console.log(error)
            toast({
                variant: 'destructive',
                title: 'Oppse!',
                description: 'could not create your agency',
            })
        }
    }
    const handleDeleteAgency = async () => {
        if (!data?.id) return
        setDeletingAgency(true)
        //WIP: discontinue the subscription
        try {
            const response = await deleteAgency(data.id)
            toast({
                title: 'Agency deleted successfully',
                description: 'Deleted your agency and all subaccounts'
            })
            router.refresh()
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'OPPSSE!',
                description: 'Could not delete your agency'
            })
        }
        setDeletingAgency(false)
    }
    return (
        <AlertDialog>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>
                        Agency Information
                    </CardTitle>
                    <CardDescription>
                        Lets create an agency for you. You can edit agency settings later from the agency settings tab
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}
                            className='space-y-4'>
                            <FormField control={form.control}
                                name="agencyLogo"
                                render={({ field }) => (

                                    <FormItem>
                                        <FormLabel>Agency Logo</FormLabel>
                                        <FormControl>
                                            <FileUpload
                                                apiEndpoint="agencyLogo"
                                                value={field.value ?? ''}
                                                onChange={(val) => field.onChange(val ?? '')}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex md:flex-row gap-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Agency Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                disabled={isLoading}
                                                    placeholder="Agency Name"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value ?? "")}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="companyEmail"
                                    render={({ field }) => {
                                        // console.log('name value:', field.value)
                                        return (
                                            <FormItem className='flex-1'>
                                                <FormLabel>Agency Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isLoading}
                                                    placeholder='Email'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }
                                    }
                                />

                            </div>
                            <div className="flex md:flex-row gap-4">
                                <FormField
                                    // disabled={isLoading}
                                    control={form.control}
                                    name="companyPhone"
                                    render={({ field }) => {
                                        // console.log('name value:', field.value)
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>Agency Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                    disabled={isLoading}
                                                        placeholder="Phone"
                                                        {...field}
                                                        onChange={(e) => field.onChange(e.target.value ?? '')}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }
                                    }
                                />
                            </div>

                            <FormField
                                // disabled={isLoading}
                                control={form.control}
                                name="whiteLabel"
                                render={({ field }) => {
                                    // console.log("whiteLabel value:", field.value)
                                    return (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border gap-4 p-4">
                                            <div>
                                                <FormLabel>Whitelabel Agency</FormLabel>
                                                <FormDescription>
                                                    Turning on whilelabel mode will show your agency logo
                                                    to all sub accounts by default. You can overwrite this
                                                    functionality through sub account settings.
                                                </FormDescription>
                                            </div>

                                            <FormControl>
                                                <Switch
                                                    checked={field.value ?? false}
                                                    onCheckedChange={(val) => field.onChange(val ?? false)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                // disabled={isLoading}
                                control={form.control}
                                name="address"
                                render={({ field }) => {
                                    // console.log('name value:', field.value)
                                    return (
                                        <FormItem className="flex-1">
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                disabled={isLoading}
                                                    placeholder="123 st..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                                }
                            />
                            <div className="flex md:flex-row gap-4">
                                <FormField
                                    // disabled={isLoading}
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => {
                                        // console.log('name value:', field.value)
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input
                                                    disabled={isLoading}
                                                        placeholder="City"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }
                                    }
                                />
                                <FormField
                                    // disabled={isLoading}
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => {
                                        // console.log('name value:', field.value)
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input
                                                    disabled={isLoading}
                                                        placeholder="State"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }
                                    }
                                />
                                <FormField
                                    // disabled={isLoading}
                                    control={form.control}
                                    name="zipCode"
                                    render={({ field }) => {
                                        // console.log('name value:', field.value)
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>Zipcpde</FormLabel>
                                                <FormControl>
                                                    <Input
                                                    disabled={isLoading}
                                                        placeholder="Zipcode"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }
                                    }
                                />
                            </div>
                            <FormField
                                // disabled={isLoading}
                                control={form.control}
                                name="country"
                                render={({ field }) => {
                                    // console.log('name value:', field.value)
                                    return (
                                        <FormItem className="flex-1">
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input
                                                disabled={isLoading}
                                                    placeholder="Country"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                                }
                            />
                            {data?.id && (
                                <div className='flex flex-col gap-2'>
                                    <FormLabel> Create a Goal</FormLabel>
                                    <FormDescription> Create a goal for your agency. As your business grows your goals grow too so dont forget to set bar higher!</FormDescription>
                                    <NumberInput
                                        defaultValue={data.goal}
                                        onValueChange={async (val: number) => {
                                            if (!data.id) return
                                            await updateAgencyDetails(data.id, { goal: val })
                                            await saveActivityLogsNotification({
                                                agencyId: data.id,
                                                description: `Updated the agency goal to | ${val} Sub Account`,
                                                subaccountId: undefined
                                            })
                                            router.refresh()
                                        }}
                                        min={1}
                                        className='bg-backgrounded !border !border-input'
                                        placeholder='Sub Account Goal'
                                    />
                                </div>
                            )}
                            <Button type='submit'
                                disabled={isLoading}
                            >
                                {isLoading ? <Loading /> : 'Save Agency Info'}
                            </Button>

                        </form>
                    </Form>
                    {data?.id && (

                        <div className='flex flex-row justify-between items-center rounded-lg border border-destructive gap-4 p-4 mt-4'>
                            <div>
                                <div>Danger Zone</div>
                            </div>
                            <div className='text-muted-foreground'>
                                Deleting your agency will delete all of your sub accounts and all of your data. Are you sure you want to delete your agency?
                            </div>
                            <AlertDialogTrigger
                                disabled={isLoading || deletingAgency}
                                className='text-red-600 p-2 text-center mt-2 rounded-md hover:bg-red-600 hover:text-white whitespace-nowrap'>
                                {deletingAgency ? "Deleting..." : "Delete Agency"}
                            </AlertDialogTrigger>
                        </div>
                    )}
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-left">
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-left">
                                This action cannot be undone. This will permanently delete the
                                Agency account and all related sub accounts.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex items-center">
                            <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                disabled={deletingAgency}
                                className="bg-destructive hover:bg-destructive"
                                onClick={handleDeleteAgency}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </CardContent>
            </Card>
        </AlertDialog>
    )
}

export default AgencyDetails