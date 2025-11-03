import { useId } from "react"

import { Checkbox } from "@/registry/building-blocks/default/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/building-blocks/default/ui/table"

const items = [
  {
    id: "1",
    name: "Connor Love",
    email: "clove@loveui.dev",
    location: "Columbus, Ohio",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Sampson Addae",
    email: "saddae@example.com",
    location: "Ghana, Africa",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "Ian Shroeter",
    email: "ischroeter@company.com",
    location: "New York City, New York",
    status: "Inactive",
    balance: "$650.00",
  },
  {
    id: "4",
    name: "Thomas Raklovits",
    email: "traklovits@company.com",
    location: "Cleveland, Ohio",
    status: "Active",
    balance: "$0.00",
  },
  {
    id: "5",
    name: "Nathan Wickersham",
    email: "nwick@company.com",
    location: "Los Angeles, CA",
    status: "Active",
    balance: "-$1,000.00",
  },
]

export default function Component() {
  const id = useId()
  return (
    <div>
      <div className="overflow-hidden rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11">
                <Checkbox id={id} />
              </TableHead>
              <TableHead className="h-11">Name</TableHead>
              <TableHead className="h-11">Email</TableHead>
              <TableHead className="h-11">Location</TableHead>
              <TableHead className="h-11">Status</TableHead>
              <TableHead className="h-11 text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox id={`table-checkbox-${item.id}`} />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="text-right">{item.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Card Table
      </p>
    </div>
  )
}
