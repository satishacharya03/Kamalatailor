import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountSettings } from "./account-settings";
import { SecuritySettings } from "./security-settings";

export const dynamic = 'force-dynamic'
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="p-6">
            <AccountSettings />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <SecuritySettings />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            {/* <NotificationSettings /> */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}