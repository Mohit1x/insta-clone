import React from "react";

function Suggestions() {
  const suggestion = [
    {
      id: 1,
      name: "james12",
      occ: "  microsoft,google ",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKtALV6HmrS30mehszlmFAz3UbADreFNYopQ&usqp=CAU",
    },
    {
      id: 2,
      name: "Pearlie.jacob95",
      occ: " green swift,red walt ",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0uOhNmWyNz36e2avplNpyIkhaWfCbzhEiwQ&usqp=CAU",
    },
    {
      id: 3,
      name: "marco.jacob12",
      occ: " swift green,white gain ",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKFdbxoHD-dTd4B9cd5lpqXsdhijRK01Dgw&usqp=CAU",
    },
    {
      id: 4,
      name: "Ahmed56",
      occ: " walter,jagsunbarg",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-6bHvhl2doIWMx3d9E_lRHLbAnGtRBt-uHQ&usqp=CAU",
    },
  ];

  return (
    <div className="ml-10 mt-4">
      <div className="flex justify-between text-sm mb-5">
        <h3 className=" text-sm text-gray-400 font-bold">
          suggestions for you
        </h3>
        <button className=" font-semi bold text-gray-600">see all</button>
      </div>

      {suggestion.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="h-14 w-14 border rounded-full p-[2px] object-cover"
            src={profile.img}
          />

          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{profile.name}</h2>
            <h3 className="text-xs text-gray-400">Works at {profile.occ}</h3>
          </div>
          <button className="text-blue-400 text-xs font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
