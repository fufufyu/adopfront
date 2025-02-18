import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  agreement: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui pernyataan ini untuk melanjutkan",
  }),
  agreement2: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui pernyataan ini untuk melanjutkan",
  }),
  agreement3: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui pernyataan ini untuk melanjutkan",
  }),
})

export default function COTADeclarationForm({ onSubmit }: { onSubmit: (data: any) => void; isPreview: boolean }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreement: false,
      agreement2: false,
      agreement3: false,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="agreement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Kami pasangan Suami - Istri menyatakan bahwa semua informasi yang saya berikan adalah benar dan saya setuju untuk mengadopsi
                  anak sesuai dengan hukum dan peraturan yang berlaku.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreement2"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Kami pasangan Suami - Istri menyatakan bahwa tidak melakukan pungutan dalam pembuatan rekomendasi pengangkatan anak?
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreement3"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Kami pasangan Suami - Istri menyatakan bersedia dan akan menyampaikan Laporan Berkala Perkembangan Anak pada platform ini.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

