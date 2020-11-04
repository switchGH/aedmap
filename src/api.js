const GAS_ACCESS_URI = process.env.GATSBY_GAS_ACCESS_URI;

const toJson = async res => {
    const js = await res.json();
    if (res.ok) {
        return js;
    } else {
        throw new Error(js.message);
    }
};

// export const test = async () => {
//     const resp = await fetch(`https://script.google.com/macros/s/${GAS_ACCESS_URI}/exec`, {
//         credentials: 'same-origin',
//     });
//     return await toJson(resp);
// };

// 表示領域内の地点を取得する(領域内４点)
export const getAllPlaces = async (params) => {
    const usp = new URLSearchParams(params);
    const resp = await fetch(`https://script.google.com/macros/s/${GAS_ACCESS_URI}/exec?${usp}`, {
        credentials: 'same-origin',
    });
    return await toJson(resp);
}