import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap harus minimal 2 karakter." }),
  nik: z.string().length(16, { message: "NIK harus 16 digit." }),
  placeOfBirth: z.string().min(2, { message: "Tempat lahir harus diisi." }),
  dateOfBirth: z.date({ required_error: "Tanggal lahir harus diisi." }),
  gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Pilih jenis kelamin." }),
  religion: z.string({ required_error: "Pilih agama." }),
  maritalStatus: z.string({ required_error: "Pilih status perkawinan." }),
  address: z.string().min(5, { message: "Alamat harus diisi minimal 5 karakter." }),
  occupation: z.string().min(2, { message: "Pekerjaan harus diisi." }),
  nationality: z.string().min(2, { message: "Kewarganegaraan harus diisi." }),
  educationLevel: z.string({ required_error: "Pilih pendidikan terakhir." }).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  fullName: 'I own a computer.',
  nik: '1234567512341234',
}

export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })


  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                Sesuai KTP, tanpa gelar depan dan belakang.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nik'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a verified email to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='m@example.com'>m@example.com</SelectItem>
                  <SelectItem value='m@google.com'>m@google.com</SelectItem>
                  <SelectItem value='m@support.com'>m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your{' '}
                <Link to='/'>email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nik'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about yourself'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>

          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            Add URL
          </Button>
        </div>
        <Button type='submit'>Update profile</Button>
      </form>
    </Form>
  )
}
