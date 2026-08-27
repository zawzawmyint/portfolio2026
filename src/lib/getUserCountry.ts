// export async function getUserCountry(ip: string): Promise<string | null> {
//   try {
//     const response = await fetch(`https://ipapi.co/${ip}/json/`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const text = await response.text(); // Get the response as text first
//     let data;
//     try {
//       data = JSON.parse(text); // Try to parse it as JSON
//     } catch (e) {
//       console.error("Error parsing JSON:", text);
//       return null;
//     }

//     if (data.error) {
//       console.error("API returned an error:", data.error);
//       return null;
//     }

//     return data.country_code;
//   } catch (error) {
//     console.error("Error fetching location:", error);
//     return null;
//   }
// }

export async function getUserCountry() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Use a reverse geocoding service to get the country from coordinates
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            resolve(data.countryCode);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}
