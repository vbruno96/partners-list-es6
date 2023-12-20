
export function PartnerList({partners, selectedPartners}) {
  return (
    <div className='partners-list'>
      {
        selectedPartners.map((partnerId) => {
          const partner = partners.find(partner => partnerId === partner.value)
          if (partner) {
            return (
              <a
                key={partner.value}
                href={partner.linkUrl}
                className="partner"
                target="_blank"
              >
                <img 
                  src={partner.imageSrc}
                  alt={partner.label} 
                />
              </a>
            )
          }
        })
      }
    </div>
  )
}