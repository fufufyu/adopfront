"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight } from "lucide-react"

const formSchema = z.object({
  nik: z.string().min(16, "NIK harus 16 digit").max(16),
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  placeOfBirth: z.string().min(2, "Tempat lahir wajib diisi"),
  dateOfBirth: z.string().min(2, "Tanggal lahir wajib diisi"),
  gender: z.string().min(1, "Jenis kelamin wajib dipilih"),
  address: z.string().min(5, "Alamat wajib diisi"),
  phoneNumber: z.string().min(10, "Nomor telepon minimal 10 digit"),
})

export default function PersonalInfoForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: "",
      fullName: "",
      placeOfBirth: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      phoneNumber: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIK</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan NIK" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempat Lahir</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan tempat lahir" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Lahir</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="L">Laki-laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan alamat lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nomor telepon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">
            Selanjutnya
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

