"use client";

import { useRouter } from "next/navigation";
import { useGlobalParams } from "@/components/context/GlobalParamsContext";
import { SettingsPage } from "@/components/Section";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { sections } from "@/components/context/sections";

export default function SectionPage({ params }: { params: Promise<{ section: string }> }) {
    const { section } = use(params);
    const router = useRouter();
    const { updateParams } = useGlobalParams();
  
    const currentSection = sections[section as keyof typeof sections];
  
    const SectionComponent = currentSection.component;
  
    const handleNext = () => {
      const sectionKeys = Object.keys(sections);
      const currentIndex = sectionKeys.indexOf(section);
      if (currentIndex < sectionKeys.length - 1) {
        const nextSection = sectionKeys[currentIndex + 1];
        router.push(`/Simulation/${nextSection}`);
      } else {
        router.push("/"); // Navigate to the root page for submission
      }
    };

    const handleBack = () => {
      const sectionKeys = Object.keys(sections);
      const currentIndex = sectionKeys.indexOf(section);
      if (currentIndex > 0) {
        const previousSection = sectionKeys[currentIndex - 1];
        router.push(`/Simulation/${previousSection}`);
      }
    };

    return (
        <SettingsPage>
            <SectionComponent 
            onParamsChange={(value: Record<string, unknown>) => {
                updateParams(section, value);
            }}
            />
            
            <div className="flex justify-end fixed bottom-4 right-4 space-x-4">
            {Object.keys(sections).indexOf(section) > 0 && (
                <Button 
                onClick={handleBack} 
                size="icon"
                className="text-primary-content"
                >
                    <ChevronLeft />
                </Button>
            )}
            <Button 
                onClick={handleNext}
                size="icon"
                className="text-primary-content"
            >
                <ChevronRight />
            </Button>
            </div>
        </SettingsPage>
    )
}