import { useState } from "react";
import "./App.css";
import { cities, City, Road, roads } from "./data/data";

interface IDepartureCity {
    id: number | null;
    distance: number | null;
}

function App() {
    const [departureCity, setDepartureCity] = useState<IDepartureCity>({
        id: null,
        distance: null,
    });
    const [error, setError] = useState<string>("");

    const citiesInfo: City[] = cities;
    const roadsInfo: Road[] = roads;

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const idCity = Number(event.target.value);
        setError("");
        const idCitiesWithStorage: number[] = citiesInfo
            .filter((city) => city.isStock > 0)
            .map((city) => city.id);

        if (idCitiesWithStorage.includes(idCity)) {
            setDepartureCity({ id: idCity, distance: 0 });
        } else {
            const roadsToUsersCity = roadsInfo.filter(
                (road) =>
                    road.dstCityId === idCity &&
                    idCitiesWithStorage.includes(road.srcCityId)
            );
            const shortestRoad = roadsToUsersCity.reduce(
                (acc: Road | null, road: Road) => {
                    if (acc === null || road.distance < acc.distance) {
                        return road;
                    } else {
                        return acc;
                    }
                },
                null
            );

            if (shortestRoad !== null) {
                setDepartureCity({
                    id: shortestRoad?.srcCityId,
                    distance: shortestRoad.distance,
                });
            } else {
                setError("Не удалось обнаружить маршрут в выбранный город");
                setDepartureCity({ id: null, distance: null });
            }
        }
    }
    console.log(departureCity);
    return (
        <div>
            <section>
                <select defaultValue="" onChange={handleChange}>
                    <option value="" disabled>
                        Выберите город
                    </option>
                    {citiesInfo.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.id}
                        </option>
                    ))}
                </select>
                {error && <div className="error">{error}</div>}
            </section>
            {!error && departureCity.id && (
                <div>
                    {departureCity.distance === 0 ? (
                        <p>
                            Вы можете забрать товар со склада вашего города{" "}
                            {departureCity.id}
                        </p>
                    ) : (
                        <p>Доставка доступна из города {departureCity.id} </p>
                    )}

                    {departureCity.distance !== null &&
                        departureCity.distance > 0 && (
                            <p>
                                Расстояние до пункта доставки составляет{" "}
                                {departureCity.distance}
                            </p>
                        )}
                </div>
            )}
        </div>
    );
}

export default App;
