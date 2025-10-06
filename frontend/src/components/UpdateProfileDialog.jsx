import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {

    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    console.log('user token ', user?.token);
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume,
    });

    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        formData.append("token", user?.token);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            } else {
                toast.error("Something went wrong. Try again.");
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false)
            setOpen(false)
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] w-full">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        {[
                            { label: "Name", name: "fullname", type: "text", value: input.fullname },
                            { label: "Email", name: "email", type: "email", value: input.email },
                            { label: "Number", name: "phoneNumber", type: "text", value: input.phoneNumber },
                            { label: "Bio", name: "bio", type: "text", value: input.bio },
                            { label: "Skills", name: "skills", type: "text", value: input.skills }
                        ].map((field, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                                <Label htmlFor={field.name} className="text-gray-700 dark:text-gray-300 font-medium sm:text-right">{field.label}</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    value={field.value}
                                    onChange={changeEventHandler}
                                    className="sm:col-span-3 w-full"
                                />
                            </div>
                        ))}

                        {/* Resume Upload */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="file" className="text-gray-700 dark:text-gray-300 font-medium sm:text-right">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="sm:col-span-3 w-full"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="w-full my-4 flex items-center justify-center gap-2">
                            {isLoading && <Loader2 className='animate-spin h-4 w-4' />}
                            {isLoading ? "Please wait" : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog
