export function save({attributes}) {
  return (
    <div>
      {
        attributes.selectedPartners.map((partnerId) => {
          if (attributes.partners.find((partner) => partner.value === partnerId)) {
            return (
              <a 
                href={partner.linkUrl}
                className="partner"
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