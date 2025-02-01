

import DirectiveCSDDD from "@/components/DirectiveCSDDD";
export default function Directive_CSDDDLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <DirectiveCSDDD />
      
        {children} 
      </div>
    );
  }