import type React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/pdf"]

const formSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  placeOfBirth: z.string().min(2, "Tempat lahir wajib diisi"),
  dateOfBirth: z.string().min(2, "Tanggal lahir wajib diisi"),
  gender: z.string().min(1, "Jenis kelamin wajib dipilih"),
  foto: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .webp"),
  aktaKelahiran: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
  kartuKeluarga: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
  ktpAyah: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
  ktpIbu: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
  ktpWali: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
  suratNikahOrangTua: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
  suratPenyerahanAnak: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
})

type FilePreview = {
  [key: string]: string | null
}

export default function ChildInfoForm({ onSubmit }: { onSubmit: (data: any) => void; isPreview: boolean }) {
  const [filePreviews, setFilePreviews] = useState<FilePreview>({})

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      placeOfBirth: "",
      dateOfBirth: "",
      gender: "",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue(fieldName as any, file)
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFilePreviews((prev) => ({ ...prev, [fieldName]: reader.result as string }))
        }
        reader.readAsDataURL(file)
      } else {
        setFilePreviews((prev) => ({ ...prev, [fieldName]: null }))
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormControl>
                <Input placeholder="Masukkan jenis kelamin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {[
          "foto",
          "aktaKelahiran",
          "kartuKeluarga",
          "ktpAyah",
          "ktpIbu",
          "ktpWali",
          "suratNikahOrangTua",
          "suratPenyerahanAnak",
        ].map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {fieldName.charAt(0).toUpperCase() +
                    fieldName
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept={fieldName === "foto" ? ".jpg,.jpeg,.png,.webp" : ".jpg,.jpeg,.png,.pdf"}
                      onChange={(e) => handleFileChange(e, fieldName)}
                    />
                    {filePreviews[fieldName] && (
                      <div className="mt-2">
                        <img
                          src={(filePreviews[fieldName] as string) || "/placeholder.svg"}
                          alt="Preview"
                          className="max-w-xs max-h-40 object-contain"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  )
}

