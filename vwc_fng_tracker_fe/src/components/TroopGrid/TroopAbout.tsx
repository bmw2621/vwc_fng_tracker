import React from 'react'

/**
 * @name: TroopAbout
 * @description:
 *   Component to display the troop's 'About' text
 * @param { aboutText: string }: extrapolated from props
 * @return: TroopAbout Component
 */

export const TroopAbout = (props) => {
  const { aboutText, experienceText } = props

  return (
    <div>
      <strong color="primary">EXPERIENCE</strong>
      <div className="rowDetailAbout">
        { experienceText }
      </div>
      <br />
      <strong color="primary">ABOUT</strong>
      <div className="rowDetailAbout">
        { aboutText }
      </div>
    </div>
  )
}
