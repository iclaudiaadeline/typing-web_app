import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Filter, 
  Calendar,
  MoreVertical,
  ArrowUpDown
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Assignment {
  id: number;
  class: string;
  teacher: string;
  goal: number;
  text: string;
  dueDate: string;
  completion: string;
  performance: "PASS" | "FAIL" | "";
}

const Assignments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssignments, setSelectedAssignments] = useState<number[]>([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  // Sample data matching the mockup
  const assignments: Assignment[] = [
    { id: 1, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 2, class: "Grade 13", teacher: "You", goal: 80, text: "Lorem Ipsum...", dueDate: "Yesterday, 4:15 PM", completion: "100%", performance: "FAIL" },
    { id: 3, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 4, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 5, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 6, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "" },
    { id: 7, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 8, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "" },
    { id: 9, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "" },
    { id: 10, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 11, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 12, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 13, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 14, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 15, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "" },
    { id: 16, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 17, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 18, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
    { id: 19, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "" },
    { id: 20, class: "Grade 9", teacher: "You", goal: 50, text: "Lorem Ipsum...", dueDate: "Tomorrow, 10:15 AM", completion: "20%", performance: "PASS" },
  ];

  const filteredAssignments = assignments.filter(assignment =>
    assignment.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAssignment = (id: number) => {
    setSelectedAssignments(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedAssignments.length === filteredAssignments.length) {
      setSelectedAssignments([]);
    } else {
      setSelectedAssignments(filteredAssignments.map(a => a.id));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your typing assignments
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Find Assignment"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedAssignments.length === filteredAssignments.length}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Class
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Teacher
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Goal
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Text
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Due Date
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Completion
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Performance
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => (
                  <TableRow 
                    key={assignment.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedAssignments.includes(assignment.id)}
                        onCheckedChange={() => toggleAssignment(assignment.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{assignment.class}</TableCell>
                    <TableCell>{assignment.teacher}</TableCell>
                    <TableCell>{assignment.goal}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{assignment.text}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>{assignment.completion}</TableCell>
                    <TableCell>
                      {assignment.performance && (
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            assignment.performance === "PASS"
                              ? "bg-primary/20 text-primary"
                              : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {assignment.performance}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate("/dashboard/practice")}>
                            Start Practice
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAssignments.length} of {assignments.length} assignments
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Assignments;

