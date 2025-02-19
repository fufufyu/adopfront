import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  pengeluaranRumahTangga: z.string().min(1, "Pengeluaran rumah tangga wajib diisi"),
  pengeluaranPendidikan: z.string().min(1, "Pengeluaran pendidikan wajib diisi"),
  pengeluaranKesehatan: z.string().min(1, "Pengeluaran kesehatan wajib diisi"),
  pengeluaranTransportasi: z.string().min(1, "Pengeluaran transportasi wajib diisi"),
  pengeluaranKomunikasi: z.string().min(1, "Pengeluaran komunikasi wajib diisi"),
  pengeluaranHiburan: z.string().min(1, "Pengeluaran hiburan wajib diisi"),
  pengeluaranPakaian: z.string().min(1, "Pengeluaran pakaian wajib diisi"),
  tabunganInvestasi: z.string().min(1, "Tabungan/investasi wajib diisi"),
  pengeluaranLainnya: z.string().min(1, "Pengeluaran lainnya wajib diisi"),
  adaCicilanKPR: z.boolean(),
  jumlahCicilanKPR: z.string().optional(),
  adaPinjamanLain: z.boolean(),
  jumlahCicilanPinjaman: z.string().optional(),
})

export default function COTAExpensesForm({ onSubmit }: { onSubmit: (data: any) => void; isPreview: boolean }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pengeluaranRumahTangga: "",
      pengeluaranPendidikan: "",
      pengeluaranKesehatan: "",
      pengeluaranTransportasi: "",
      pengeluaranKomunikasi: "",
      pengeluaranHiburan: "",
      pengeluaranPakaian: "",
      tabunganInvestasi: "",
      pengeluaranLainnya: "",
      adaCicilanKPR: false,
      adaPinjamanLain: false,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "pengeluaranRumahTangga",
            "pengeluaranPendidikan",
            "pengeluaranKesehatan",
            "pengeluaranTransportasi",
            "pengeluaranKomunikasi",
            "pengeluaranHiburan",
            "pengeluaranPakaian",
            "tabunganInvestasi",
            "pengeluaranLainnya",
          ].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as any}
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .charAt(0)
                      .toUpperCase() + field.replace(/([A-Z])/g, " $1").slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Masukkan jumlah" onChange={onChange} value={value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="adaCicilanKPR"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Apakah Anda memiliki cicilan KPR?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {form.watch("adaCicilanKPR") && (
          <FormField
            control={form.control}
            name="jumlahCicilanKPR"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Cicilan KPR per Bulan</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Masukkan jumlah cicilan KPR" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="adaPinjamanLain"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Apakah Anda memiliki pinjaman lain?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {form.watch("adaPinjamanLain") && (
          <FormField
            control={form.control}
            name="jumlahCicilanPinjaman"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Cicilan Pinjaman per Bulan</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Masukkan jumlah cicilan pinjaman" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  )
}

