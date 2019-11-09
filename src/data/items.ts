export interface CraftableGearPiece {
  name: String;
  mats: Array<{
    id: MaterialIds;
    amount: Number;
  }>;
}

export enum MaterialIds {
  PrimalMana,
  PrimalFire,
  Spellcloth,
  NetherwebSpiderSilk,
  BoltImbuedNetherweave,
  BoltNetherweave,
  ArcaneDust,
  Netherweave,
}

export const CraftableItems: Map<String, CraftableGearPiece> = new Map([
  [
    "SpellfireRobe",
    {
      name: "Spellfire Robe",
      mats: [
        {
          id: MaterialIds.Spellcloth,
          amount: 14,
        },
        {
          id: MaterialIds.PrimalFire,
          amount: 16,
        },
        {
          id: MaterialIds.NetherwebSpiderSilk,
          amount: 4,
        },
      ],
    },
  ],
]);
