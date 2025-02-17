import ProfilIstri from '@/features/settings/profil-istri'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/settings/profil-istri')({
  component: ProfilIstri,
})
