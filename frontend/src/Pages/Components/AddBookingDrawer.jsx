import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const CreateAppointment = ({ open, onClose, onCreate, businessId }) => {
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    services: [],
    staff: "",
    client_appointments: "",
    appointment_date: "",
    appointment_time: "",
    status: "Scheduled",
    payment_status: "Pending",
    pay_mode: "Offline", // Default pay_mode
    notes: "",
    business_id: "", // Empty initially
  });

  useEffect(() => {
    if (businessId) {
      setFormData((prev) => ({
        ...prev,
        business_id: businessId, // Update business_id in formData
      }));
      fetchBusinessData();
    }
  }, [businessId]); // Effect runs whenever businessId changes

  const fetchBusinessData = async () => {
    try {
      const response = await fetch(
        `${APIURL}/api/business/${businessId}/`
      );
      const data = await response.json();

      setServices(data.business_services || []);
      setStaff(data.business_team_members || []);
      setClients(data.clients || []);
    } catch (err) {
      console.error("Failed to fetch business data:", err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${APIURL}/api/appointments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Appointment created successfully!");
        onCreate();
        onClose();
      } else {
        const errorData = await response.json();
        alert("Failed to create appointment: " + JSON.stringify(errorData));
      }
    } catch (err) {
      console.error("Error creating appointment:", err);
      alert("An error occurred while creating the appointment.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create Appointment</DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label>Service</label>
            <Select
              onValueChange={(value) => handleInputChange("services", [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.service_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>Assign Staff</label>
            <Select
              onValueChange={(value) => handleInputChange("staff", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>
              <SelectContent>
                {staff.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.first_name} {member.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>Client</label>
            <Select
              onValueChange={(value) =>
                handleInputChange("client_appointments", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.client_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Date</label>
              <Input
                type="date"
                onChange={(e) =>
                  handleInputChange("appointment_date", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <label>Time</label>
              <Input
                type="time"
                onChange={(e) =>
                  handleInputChange("appointment_time", e.target.value)
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <label>Pay Mode</label>
            <Select
              value={formData.pay_mode}
              onValueChange={(value) => handleInputChange("pay_mode", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pay mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Offline">Offline</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-purple-600" onClick={handleSubmit}>
            Create Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointment;
