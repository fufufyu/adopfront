"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Upload } from "lucide-react"
import { useState } from "react"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const formSchema = z.object({
  profilePicture: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .webp"),
  nik: z.string().min(16, "NIK harus 16 digit").max(16),
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  placeOfBirth: z.string().min(2, "Tempat lahir wajib diisi"),
  dateOfBirth: z.string().min(2, "Tanggal lahir wajib diisi"),
  gender: z.string().min(1, "Jenis kelamin wajib dipilih"),
  address: z.string().min(5, "Alamat wajib diisi"),
  phoneNumber: z.string().min(10, "Nomor telepon minimal 10 digit"),
})

export default function HusbandInfoForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue("profilePicture", file)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem className="flex flex-col items-center space-y-4">
              <FormLabel>Foto Profil</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative h-32 w-32 overflow-hidden rounded-full">
                    {previewUrl ? (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="max-w-[200px]"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

