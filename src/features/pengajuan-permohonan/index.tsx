import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import HusbandInfoForm from "./components/husband-info-form"
import HusbandWorkForm from "./components/husband-work-form"
import WifeInfoForm from "./components/wife-info-form"
import WifeWorkForm from "./components/wife-work-form"
import FamilySpendingForm from "./components/family-spending-form"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Search } from "@/components/search"
import { ThemeSwitch } from "@/components/theme-switch"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { Main } from "@/components/layout/main"

const steps = [
  { id: 1, name: "Informasi Suami" },
  { id: 2, name: "Pekerjaan Suami" },
  { id: 3, name: "Informasi Istri" },
  { id: 4, name: "Pekerjaan Istri" },
  { id: 5, name: "Pengeluaran Keluarga" },
]

export default function PengajuanPermohonan() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const progress = (currentStep / steps.length) * 100

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (data: any) => {
    const finalData = { ...formData, ...data }
    console.log("Final form data:", finalData)
    // Handle form submission here
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="container mx-auto py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Pengajuan Permohonan</h1>
            <p className="text-muted-foreground">Silakan lengkapi formulir berikut untuk mengajukan permohonan</p>
          </div>

          <Card className="p-6">
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm">
                {steps.map((step) => (
                  <span
                    key={step.id}
                    className={`${step.id === currentStep ? "font-medium text-primary" : "text-muted-foreground"}`}
                  >
                    {step.name}
                  </span>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="mt-6">
              {currentStep === 1 && <HusbandInfoForm onSubmit={handleNext} />}
              {currentStep === 2 && <HusbandWorkForm onSubmit={handleNext} />}
              {currentStep === 3 && <WifeInfoForm onSubmit={handleNext} />}
              {currentStep === 4 && <WifeWorkForm onSubmit={handleNext} />}
              {currentStep === 5 && <FamilySpendingForm onSubmit={handleSubmit} />}

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Sebelumnya
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Main>
    </>
  )
}

