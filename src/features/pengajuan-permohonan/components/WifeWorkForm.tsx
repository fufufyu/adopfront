import type React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { useState } from "react"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/pdf"]

const formSchema = z.object({
  paycheckSlip: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Ukuran maksimal file adalah 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), "Format yang diterima: .jpg, .jpeg, .png, dan .pdf"),
  occupation: z.string().min(2, "Pekerjaan wajib diisi"),
  companyName: z.string().min(2, "Nama perusahaan wajib diisi"),
  position: z.string().min(2, "Jabatan wajib diisi"),
  workAddress: z.string().min(5, "Alamat kantor wajib diisi"),
  monthlyIncome: z.string().min(1, "Penghasilan bulanan wajib diisi"),
  employmentStatus: z.string().min(1, "Status pekerjaan wajib dipilih"),
  yearsOfService: z.string().min(1, "Lama bekerja wajib diisi"),
})

export default function WifeWorkForm({ onSubmit }: { onSubmit: (data: any) => void; isPreview: boolean }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      occupation: "",
      companyName: "",
      position: "",
      workAddress: "",
      monthlyIncome: "",
      employmentStatus: "",
      yearsOfService: "",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreviewUrl(null)
      }
      form.setValue("paycheckSlip", file)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paycheckSlip"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Slip Gaji</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {previewUrl && (
                    <div className="relative h-48 w-full overflow-hidden rounded-lg">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} {...field} />
                    {!previewUrl && <Upload className="h-5 w-5 text-muted-foreground" />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pekerjaan</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan pekerjaan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Perusahaan</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama perusahaan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jabatan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan jabatan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsOfService"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lama Bekerja (Tahun)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="workAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Kantor</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan alamat kantor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Penghasilan Bulanan</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="Masukkan penghasilan bulanan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employmentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Pekerjaan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status pekerjaan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tetap">Karyawan Tetap</SelectItem>
                  <SelectItem value="kontrak">Karyawan Kontrak</SelectItem>
                  <SelectItem value="wirausaha">Wirausaha</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

