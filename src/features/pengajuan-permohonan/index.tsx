import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import HusbandInfoForm from "./components/HusbandInfoForm"
import HusbandWorkForm from "./components/HusbandWorkForm"
import WifeInfoForm from "./components/WifeInfoForm"
import WifeWorkForm from "./components/WifeWorkForm"
import ChildInfoForm from "./components/ChildInfoForm"
import COTAInfoForm from "./components/COTAInfoForm"
import COTAExpensesForm from "./components/COTAExpensesForm"
import COTADeclarationForm from "./components/COTADeclarationForm"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import HusbandHealthForm from "./components/HusbandHealthForm"
import WifeHealthForm from "./components/WifeHealthForm"

const steps = [
  { id: 1, name: "Informasi COTA" },
  { id: 2, name: "Informasi Suami" },
  { id: 3, name: "Pekerjaan Suami" },
  { id: 4, name: "Kesehatan Suami" },
  { id: 5, name: "Informasi Istri" },
  { id: 6, name: "Pekerjaan Istri" },
  { id: 7, name: "Kesehatan Istri" },
  { id: 8, name: "Pengeluaran COTA" },
  { id: 9, name: "Informasi Anak" },
  { id: 10, name: "Pernyataan COTA" },
]

export default function PengajuanPermohonan() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [isPreview, setIsPreview] = useState(false)

  const progress = (currentStep / steps.length) * 100

  const handleNext = (data: any) => {
    if (!isPreview) {
      setFormData((prev) => ({ ...prev, ...data }))
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (data: any) => {
    if (!isPreview) {
      const finalData = { ...formData, ...data }
      console.log("Final form data:", finalData)
      // Handle form submission here
    }
  }

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <COTAInfoForm onSubmit={handleNext} isPreview={isPreview} />
      case 2:
        return <HusbandInfoForm onSubmit={handleNext} isPreview={isPreview} />
      case 3:
        return <HusbandWorkForm onSubmit={handleNext} isPreview={isPreview} />
      case 4:
        return <HusbandHealthForm onSubmit={handleNext} isPreview={isPreview} />
      case 5:
        return <WifeInfoForm onSubmit={handleNext} isPreview={isPreview} />
      case 6:
        return <WifeWorkForm onSubmit={handleNext} isPreview={isPreview} />
      case 7:
        return <WifeHealthForm onSubmit={handleNext} isPreview={isPreview} />
      case 8:
        return <COTAExpensesForm onSubmit={handleNext} isPreview={isPreview} />
      case 9:
        return <ChildInfoForm onSubmit={handleSubmit} isPreview={isPreview} />
      case 10:
        return <COTADeclarationForm onSubmit={handleSubmit} isPreview={isPreview} />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pengajuan Permohonan</h1>
        <p className="text-muted-foreground">Silakan lengkapi formulir berikut untuk mengajukan permohonan</p>
      </div>

      <Card className="p-6">
        <div className="mb-8">
          <div className="mb-2 flex flex-wrap justify-between text-sm">
            {steps.map((step) => (
              <TooltipProvider key={step.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setCurrentStep(step.id)
                        setIsPreview(true)
                      }}
                      className={`px-2 py-1 rounded ${step.id === currentStep ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                    >
                      {step.id}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{step.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
          <h2 className="text-2xl font-semibold mt-4 mb-6">{steps[currentStep - 1].name}</h2>
        </div>

        <div className="mt-6">
          {renderForm()}

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Sebelumnya
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={() => handleNext({})} disabled={!isPreview}>
                Selanjutnya
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => handleSubmit({})} disabled={!isPreview}>
                Ajukan Permohonan
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

