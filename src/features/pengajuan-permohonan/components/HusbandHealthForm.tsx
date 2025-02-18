import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import FileUpload from "./FileUpload"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]

const formSchema = z.object({
  aktaKelahiran: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
  suratKeteranganSehat: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
  suratKeteranganKesehatanJiwa: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
})

export default function HusbandHealthForm({ onSubmit }: { onSubmit: (data: any) => void; isPreview: boolean }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FileUpload
          label="Akta Kelahiran"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(file) => form.setValue("aktaKelahiran", file)}
          error={form.formState.errors.aktaKelahiran?.message as string}
        />
        <FileUpload
          label="Surat Keterangan Sehat"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(file) => form.setValue("suratKeteranganSehat", file)}
          error={form.formState.errors.suratKeteranganSehat?.message as string}
        />
        <FileUpload
          label="Surat Keterangan Kesehatan Jiwa"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(file) => form.setValue("suratKeteranganKesehatanJiwa", file)}
          error={form.formState.errors.suratKeteranganKesehatanJiwa?.message as string}
        />

      </form>
    </Form>
  )
}

