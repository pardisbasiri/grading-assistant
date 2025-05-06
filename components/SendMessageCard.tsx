"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const PROTOTYPE_STUDENT_NAME = "Ana Maria Gomez";

export function SendMessageCard() {
  const [messageTitle, setMessageTitle] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const statusMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (statusMessageTimeoutRef.current) {
        clearTimeout(statusMessageTimeoutRef.current);
      }
    };
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageTitle(event.target.value);
    if (statusMessage) setStatusMessage("");
    if (statusMessageTimeoutRef.current) {
      clearTimeout(statusMessageTimeoutRef.current);
    }
  };

  const handleMessageBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageBody(event.target.value);
    if (statusMessage) setStatusMessage("");
    if (statusMessageTimeoutRef.current) {
      clearTimeout(statusMessageTimeoutRef.current);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (statusMessageTimeoutRef.current) {
      clearTimeout(statusMessageTimeoutRef.current);
    }

    if (!messageTitle.trim() || !messageBody.trim()) {
      setStatusMessage("Please enter both a title and a message.");
      statusMessageTimeoutRef.current = setTimeout(() => {
        setStatusMessage("");
      }, 3000);
      return;
    }

    setIsSending(true);
    setStatusMessage(`Sending message to ${PROTOTYPE_STUDENT_NAME}...`);

    console.log("--- Sending Message (Prototype) ---");
    console.log("Message Title:", messageTitle);
    console.log("Message Body:", messageBody);
    console.log("------------------------------------");

    await new Promise(resolve => setTimeout(resolve, 1500));

    const success = Math.random() > 0.3;
    let finalStatusMessage = "";
    if (success) {
      finalStatusMessage = "Message sent successfully!";
      setMessageTitle("");
      setMessageBody("");
    } else {
      finalStatusMessage = "Failed to send message. Please try again.";
    }
    setStatusMessage(finalStatusMessage);

    statusMessageTimeoutRef.current = setTimeout(() => {
      setStatusMessage("");
    }, 3000);

    setIsSending(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Send Message to {PROTOTYPE_STUDENT_NAME}
        </CardTitle>
        <CardDescription>
          Compose and send a direct message to anamaria.gomez@upm.es
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="message-title">Title</Label>
            <Input
              id="message-title"
              type="text"
              placeholder="Enter message title (e.g., Assignment Feedback)"
              value={messageTitle}
              onChange={handleTitleChange}
              disabled={isSending}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message-body">Message</Label>
            <Textarea
              id="message-body"
              placeholder="Type your detailed message here..."
              value={messageBody}
              onChange={handleMessageBodyChange}
              rows={6}
              disabled={isSending}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:items-center">
          <Button
            type="submit"
            disabled={isSending || !messageTitle.trim() || !messageBody.trim()}
          >
            {isSending ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send Message
              </>
            )}
          </Button>
          {statusMessage && (
            <p className={`text-sm ${statusMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
              {statusMessage}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}