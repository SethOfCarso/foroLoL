export class Utils {
    static getRankImage(user) {
        if (user.level <= 1) {
          return '../../../../assets/images/base-icons/bronze.png';
        } else if (user.level === 2) {
          return '../../../../assets/images/base-icons/silver.png';
        } else if (user.level === 3) {
          return'../../../../assets/images/base-icons/gold.png';
        } else if (user.level === 4) {
          return '../../../../assets/images/base-icons/platinum.png';
        } else if (user.level === 5) {
          return '../../../../assets/images/base-icons/diamond.png';
        }
    }
}
