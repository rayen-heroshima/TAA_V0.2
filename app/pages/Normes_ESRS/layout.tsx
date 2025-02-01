
import NormesESRS from "@/components/NormesESRS";


export default function Normes_ESRSLayout({ children }: { children: React.ReactNode }) {
  
    return (
      <div>
        <NormesESRS />
        {children} 
      </div>
    );
  }