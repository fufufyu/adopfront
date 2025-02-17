import { createLazyFileRoute } from '@tanstack/react-router'
import ProfilSuami from '@/features/settings/profil-suami'

export const Route = createLazyFileRoute('/_authenticated/settings/profil-suami')({
  component: ProfilSuami,
})
