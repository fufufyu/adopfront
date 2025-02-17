import { createLazyFileRoute } from '@tanstack/react-router'
import PengajuanPermohonan from '@/features/pengajuan-permohonan'

export const Route = createLazyFileRoute(
  '/_authenticated/pengajuan-permohonan/',
)({
  component: PengajuanPermohonan,
})
