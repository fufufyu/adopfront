import type React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/pdf"]

const formSchema = z.object({
  marriageCity: z.string().min(2, "Kota pernikahan wajib diisi"),
  marriageDate: z.string().min(2, "Tanggal pernikahan wajib diisi"),
  marriageCertificate: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
})

export default function COTAInfoForm({ onSubmit }: { onSubmit: (data: any) => void; isPreview: boolean }) {
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marriageCity: "",
      marriageDate: "",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("marriageCertificate", file)
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFilePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setFilePreview(null)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="marriageCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kota Pernikahan</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan kota pernikahan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marriageDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Pernikahan</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marriageCertificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sertifikat Pernikahan</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} />
                  {filePreview && (
                    <div className="mt-2">
                      <img
                        src={filePreview || "/placeholder.svg"}
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
      </form>
    </Form>
  )
}

