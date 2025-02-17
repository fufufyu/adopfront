import { createLazyFileRoute } from '@tanstack/react-router'
import Permohonan from '@/features/permohonan'

export const Route = createLazyFileRoute('/_authenticated/permohonan/')({
  component: Permohonan,
})
