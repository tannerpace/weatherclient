import { Restaurant } from "@/components/Map"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
type ItemCardsProps = { filteredRestaurants: Restaurant[] }

const ItemCards: React.FC<ItemCardsProps> = ({
  filteredRestaurants,
}: ItemCardsProps) => {
  return (
    <div className="w-full p-4 overflow-y-auto h-1/3">
      {filteredRestaurants.map((restaurant, index) => (
        <div key={index} className="border-b border-gray-300 flex-row">
          <a
            href={restaurant.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {restaurant.name}
          </a>
          <div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.long}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline flex items-center mt-1"
            >
              <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemCards
