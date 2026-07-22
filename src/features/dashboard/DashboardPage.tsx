import { Boxes, CircleCheck, UserCheck, Wrench } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useDashboardData } from '@/features/dashboard/hooks/use-dashboard-data'
import { StatusDonut } from '@/features/dashboard/components/StatusDonut'
import { CategoryBar } from '@/features/dashboard/components/CategoryBar'
import { RecentAssignments } from '@/features/dashboard/components/RecentAssignments'
import { UpcomingWarranty } from '@/features/dashboard/components/UpcomingWarranty'

export function DashboardPage() {
  const {
    total,
    available,
    assigned,
    maintenance,
    byStatus,
    byCategory,
    recent,
    expiring,
    isPending,
    isError,
    refetch,
  } = useDashboardData()

  // One query backs every panel, so one error state covers the page rather than
  // four panels each failing separately.
  if (isError) {
    return (
      <ErrorState
        title="The asset register did not load"
        description="The catalogue service is unreachable. Your data is safe."
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-content-muted text-sm">
          Everything your organisation owns, at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total assets"
          value={total}
          icon={Boxes}
          isLoading={isPending}
        />
        <StatCard
          label="Available"
          value={available}
          icon={CircleCheck}
          isLoading={isPending}
        />
        <StatCard
          label="Assigned"
          value={assigned}
          icon={UserCheck}
          isLoading={isPending}
        />
        <StatCard
          label="In maintenance"
          value={maintenance}
          icon={Wrench}
          isLoading={isPending}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="By status">
          {isPending ? (
            <Skeleton className="h-44 w-full" />
          ) : (
            <StatusDonut byStatus={byStatus} />
          )}
        </Card>

        <Card title="By category">
          {isPending ? (
            <Skeleton className="h-44 w-full" />
          ) : (
            <CategoryBar byCategory={byCategory} />
          )}
        </Card>

        <Card title="Recently assigned">
          {isPending ? <ListSkeleton /> : <RecentAssignments assets={recent} />}
        </Card>

        <Card title="Warranty expiring soon">
          {isPending ? (
            <ListSkeleton />
          ) : (
            <UpcomingWarranty assets={expiring} />
          )}
        </Card>
      </div>
    </div>
  )
}

function ListSkeleton() {
  return (
    <div className="grid gap-3">
      {[0, 1, 2, 3, 4].map((row) => (
        <Skeleton key={row} className="h-10 w-full" />
      ))}
    </div>
  )
}
