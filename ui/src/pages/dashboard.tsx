import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { useNotification } from "@shared/providers/notification-provider";
import { ArrowUp, ArrowDown, Users, DollarSign, Package, Activity } from "lucide-react";

const stats = [
  { name: "Total Revenue", value: "$45,231", change: "+12.5%", changeType: "increase", icon: DollarSign },
  { name: "Active Users", value: "2,345", change: "+8.2%", changeType: "increase", icon: Users },
  { name: "Products", value: "123", change: "-2.4%", changeType: "decrease", icon: Package },
  { name: "Conversion Rate", value: "3.24%", change: "+1.2%", changeType: "increase", icon: Activity }
];

export const Dashboard = () => {
  const { addNotification } = useNotification();

  const handleTestNotification = (type: "success" | "error" | "info" | "warning") => {
    const messages = {
      success: { title: "Success!", message: "Operation completed successfully" },
      error: { title: "Error!", message: "Something went wrong" },
      info: { title: "Info", message: "Here's some useful information" },
      warning: { title: "Warning", message: "Please review this action" }
    };

    addNotification({
      type,
      ...messages[type]
    });
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's what's happening with your app today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
              <p className={`text-xs flex items-center mt-1 ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                {stat.changeType === "increase" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Notifications</CardTitle>
          <CardDescription>Click the buttons below to test different notification types</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button onClick={() => handleTestNotification("success")} className="bg-green-600 hover:bg-green-700">
            Success
          </Button>
          <Button onClick={() => handleTestNotification("error")} variant="destructive">
            Error
          </Button>
          <Button onClick={() => handleTestNotification("warning")} className="bg-yellow-600 hover:bg-yellow-700">
            Warning
          </Button>
          <Button onClick={() => handleTestNotification("info")} variant="secondary">
            Info
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
