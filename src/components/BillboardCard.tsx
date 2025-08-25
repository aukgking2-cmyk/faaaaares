import { MapPin, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Billboard } from "@/types"

interface BillboardCardProps {
  billboard: Billboard
  isSelected: boolean
  onToggleSelection: (billboardId: string) => void
  onViewImage: (imageUrl: string) => void
}

export default function BillboardCard({ billboard, isSelected, onToggleSelection, onViewImage }: BillboardCardProps) {
  // حساب الأيام المتبقية للانتهاء
  const getDaysRemaining = () => {
    if (!billboard.expiryDate) return null

    const today = new Date()
    const expiryDate = new Date(billboard.expiryDate)
    today.setHours(0, 0, 0, 0)
    expiryDate.setHours(0, 0, 0, 0)

    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? diffDays : 0
  }

  const daysRemaining = getDaysRemaining()

  return (
    <Card
      className={`overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 bg-white/80 backdrop-blur-sm ${
        isSelected 
          ? "border-green-500 shadow-green-200 shadow-lg" 
          : "hover:border-yellow-400 hover:-mt-1"
      }`}
    >
      <div className="relative">
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelection(billboard.id)}
            className="w-5 h-5 text-green-600 bg-white border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
          />
        </div>

        <img
          src={billboard.imageUrl || "/roadside-billboard.png"}
          alt={billboard.name}
          className="w-full h-40 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://lh3.googleusercontent.com/d/13yTnaEWp2tFSxCmg8AuXH1e9QvPNMYWq";
          }}
        />
        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg px-4 py-2 rounded-full shadow-lg">
          {billboard.size}
        </Badge>
        <Button
          size="sm"
          className="absolute top-4 left-12 bg-black/80 hover:bg-black text-white rounded-full px-4 py-2 shadow-lg font-sans"
          onClick={() => onViewImage(billboard.imageUrl)}
          dir="rtl"
          style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'}}
        >
          <Eye className="w-4 h-4" />
          <span dir="rtl">عرض</span>
        </Button>
      </div>

      <CardContent className="p-4" dir="rtl">
        <div className="text-right space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-2xl font-black text-gray-900 leading-tight tracking-tight font-sans" dir="rtl">{billboard.name}</h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-start text-gray-700" dir="rtl">
              <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5 ml-2" />
              <div className="text-right flex-1">
                <p className="text-lg font-black leading-snug text-gray-800 font-sans" dir="rtl">{billboard.location}</p>
                <p className="text-base text-gray-700 mt-1 font-bold font-sans" dir="rtl">{billboard.area}</p>
              </div>
            </div>
          </div>

          {/* بيانات العميل - Client Information */}
          {billboard.contractNumber && billboard.contractNumber.trim() !== '' && (
            <div className="space-y-2 border-t border-gray-200 pt-3" dir="rtl">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="text-sm font-bold text-blue-800 mb-2 text-right font-sans" dir="rtl">بيانات الحجز</h4>
                <div className="space-y-1 text-right">
                  <div className="flex" dir="rtl" style={{justifyContent: 'space-between'}}>
                    <span className="text-sm text-blue-700 font-semibold font-sans">:رقم العقد</span>
                    <span className="text-sm text-blue-900 font-bold font-sans">{billboard.contractNumber}</span>
                  </div>
                  {billboard.clientName && billboard.clientName.trim() !== '' ? (
                    <div className="flex" dir="rtl" style={{justifyContent: 'space-between'}}>
                      <span className="text-sm text-blue-700 font-semibold font-sans">:العميل</span>
                      <span className="text-sm text-blue-900 font-bold font-sans">{billboard.clientName}</span>
                    </div>
                  ) : (
                    <div className="flex" dir="rtl" style={{justifyContent: 'space-between'}}>
                      <span className="text-sm text-blue-700 font-semibold font-sans">:العميل</span>
                      <span className="text-sm text-gray-500 font-bold font-sans">غير محدد</span>
                    </div>
                  )}
                  {billboard.advertisementType && (
                    <div className="flex" dir="rtl" style={{justifyContent: 'space-between'}}>
                      <span className="text-sm text-blue-700 font-semibold font-sans">:نوع الإعلان</span>
                      <span className="text-sm text-blue-900 font-bold font-sans">{billboard.advertisementType}</span>
                    </div>
                  )}
                  {billboard.expiryDate && (
                    <div className="flex" dir="rtl" style={{justifyContent: 'space-between'}}>
                      <span className="text-sm text-blue-700 font-semibold font-sans">:تاريخ الانتهاء</span>
                      <span className="text-sm text-blue-900 font-bold font-sans">{billboard.expiryDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 py-2" dir="rtl" style={{justifyContent: 'space-between'}}>
            <Badge className="bg-yellow-50 text-yellow-800 border border-yellow-200 px-3 py-1.5 rounded-full font-black text-sm font-sans" dir="rtl">
              {billboard.municipality}
            </Badge>
            <div className="flex flex-col items-end gap-1">
              <Badge
                className={`border px-3 py-1.5 rounded-full font-black text-sm font-sans ${
                  billboard.status === "متاح"
                    ? "bg-green-50 text-green-800 border-green-200"
                    : billboard.status === "قريباً"
                      ? "bg-red-50 text-red-800 border-red-200"
                      : billboard.status === "محجوز"
                        ? "bg-orange-50 text-orange-800 border-orange-200"
                        : "bg-gray-50 text-gray-800 border-gray-200"
                }`}
                dir="rtl"
              >
                {billboard.status}
              </Badge>
              {/* عرض عداد الأيام المتبقية للحالة "قريباً" */}
              {billboard.status === "قريباً" && daysRemaining !== null && (
                <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full border border-red-200 font-bold font-sans" dir="rtl">
                  {daysRemaining === 0 ? (
                    <span>ينتهي اليوم</span>
                  ) : daysRemaining === 1 ? (
                    <span>يوم واحد متبقي</span>
                  ) : daysRemaining === 2 ? (
                    <span>يومان متبقيان</span>
                  ) : daysRemaining <= 10 ? (
                    <span>{daysRemaining} أيام متبقية</span>
                  ) : (
                    <span>{daysRemaining} يوماً متبقياً</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="pt-1">
            <Button
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-black py-3 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-base font-sans"
              onClick={() => window.open(billboard.gpsLink, "_blank")}
              dir="rtl"
              style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}
            >
              <MapPin className="w-4 h-4" />
              <span dir="rtl">عرض الموقع على الخريطة</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
