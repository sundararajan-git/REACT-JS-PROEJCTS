import {
  IconTrendingDown,
  IconTrendingUp,
  IconUser,
  IconBriefcase,
  IconUserPlus,
  IconChartBar,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const SectionCards = () => {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Employees</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            120
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUser className="mr-1" /> Active
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Workforce stable{" "}
            <IconTrendingUp className="size-4 text-green-500" />
          </div>
          <div className="text-muted-foreground">Company headcount status</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Job Applications</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconBriefcase className="mr-1" /> +15%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Increased hiring demand{" "}
            <IconTrendingUp className="size-4 text-green-500" />
          </div>
          <div className="text-muted-foreground">Compared to last month</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Employees</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            12
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUserPlus className="mr-1" /> +4
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Onboarding successful{" "}
            <IconTrendingUp className="size-4 text-green-500" />
          </div>
          <div className="text-muted-foreground">This month’s hires</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Satisfaction Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            89%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconChartBar className="mr-1" /> Positive
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Employee feedback strong{" "}
            <IconTrendingUp className="size-4 text-green-500" />
          </div>
          <div className="text-muted-foreground">HR quarterly survey</div>
        </CardFooter>
      </Card>
    </div>
  );
};
