import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export  function RegisterForm({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-3xl">Register</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form>
            <div className="space-y-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input id="full-name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="me@example.com" required />
            </div>
            <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </CardContent>
        </Card>
    </div>
  )
}