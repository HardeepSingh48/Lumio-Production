"use client";
import { saveActivityLogsNotification, sendInvitation } from "@/lib/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../global/loading";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../ui/use-toast";

interface SendInvitationProps {
    agencyId: string;
}

const SendInvitation: React.FC<SendInvitationProps> = ({ agencyId }) => {
    const { toast } = useToast();
    const userDataSchema = z.object({
        email: z.string().email(),
        role: z.enum(["AGENCY_ADMIN", "SUBACCOUNT_USER", "SUBACCOUNT_GUEST"]),
    });

    const form = useForm<z.infer<typeof userDataSchema>>({
        resolver: zodResolver(userDataSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            role: "SUBACCOUNT_USER",
        },
    });

    const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
        try {
            const response = await sendInvitation(values.role, values.email, agencyId);

            await saveActivityLogsNotification({
                agencyId,
                description: `Invitation ${response.email}`,
                subaccountId: undefined,
            });

            toast({
                title: "Success",
                description: "Created and sent invitation",
            });

            form.reset();
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Oppse!",
                description: "Could not send invitation",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Invitation</CardTitle>
                <CardDescription>An invitation will be sent to the user. Users who already have an invitation sent out to their email, will not receive another invitation.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <FormField
                            // disabled={form.formState.isSubmitting}
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field}  disabled={form.formState.isSubmitting}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            // disabled={form.formState.isSubmitting}
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>User role</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value} disabled={form.formState.isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select user role..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="AGENCY_ADMIN">Agency Admin</SelectItem>
                                            <SelectItem value="SUBACCOUNT_USER">Sub Account User</SelectItem>
                                            <SelectItem value="SUBACCOUNT_GUEST">Sub Account Guest</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            {form.formState.isSubmitting ? <Loading /> : "Send Invitation"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SendInvitation;