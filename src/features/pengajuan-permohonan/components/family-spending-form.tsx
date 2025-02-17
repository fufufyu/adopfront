"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"

const formSchema = z.object({
  householdExpenses: z.string().min(1, "Pengeluaran rumah tangga wajib diisi"),
  educationExpenses: z.string().min(1, "Pengeluaran pendidikan wajib diisi"),
  healthExpenses: z.string().min(1, "Pengeluaran kesehatan wajib diisi"),
  transportationExpenses: z.string().min(1, "Pengeluaran transportasi wajib diisi"),
  communicationExpenses: z.string().min(1, "Pengeluaran komunikasi wajib diisi"),
  otherExpenses: z.string().min(1, "Pengeluaran lainnya wajib diisi"),
})

export default function FamilySpendingForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      householdExpenses: "",
      educationExpenses: "",
      healthExpenses: "",
      transportationExpenses: "",
      communicationExpenses: "",
      otherExpenses: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="householdExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pengeluaran Rumah Tangga</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="Masukkan jumlah pengeluaran" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="educationExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pengeluaran Pendidikan</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="Masukkan jumlah pengeluaran" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="healthExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pengeluaran Kesehatan</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="Masukkan jumlah pengeluaran" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transportationExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pengeluaran Transportasi</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="Masukkan jumlah pengeluaran" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="communicationExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pengeluaran Komunikasi</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="Masukkan jumlah pengeluaran" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otherExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pengeluaran Lainnya</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="Masukkan jumlah pengeluaran" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            Kirim Permohonan
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

