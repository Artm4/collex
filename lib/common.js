import * as Location from "expo-location/build/Location";

export class GeoLocation{


static async hasServicesEnabled()
{
    return Location.hasServicesEnabledAsync();
}

static async getLocation()
{
    //let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
        console.log("no permission");
    }
    else {

        console.log("working on location");

        let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High})

        console.log('latitude is ' + location.coords.latitude.toString())
        console.log('longitude is ' + location.coords.longitude.toString())
        return location;
    }

}

}