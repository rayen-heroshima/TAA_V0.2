import Cross from "@/components/Cross";
export default function CrossCuttingLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <Cross />
        
        {children} {/* Acts as an "Outlet" for dashboard pages */}
      </div>
    );
  }