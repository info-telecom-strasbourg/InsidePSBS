import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"
const Step4 = ({svgprops,TextColor,AccentColor}) => (
  <Svg
  width={345}
  height={44}
  fill="none"
  {...svgprops}
>
  <Path
    stroke={AccentColor}
    strokeWidth={5}
    d="M19 13h100M119 13h100M219 13h100"
  />
  <Rect width={27} height={27} x={5.5} fill={AccentColor} rx={13.5} />
  <Path
    fill={TextColor}
    d="M20.61 19.5h-2.415v-6.61a45.735 45.735 0 0 1 .031-1.5c.011-.286.021-.544.032-.773a5.301 5.301 0 0 1-.352.352c-.172.161-.333.307-.484.437l-1.313 1.055-1.164-1.453 3.68-2.93h1.984V19.5Z"
  />
  <Path
    fill={AccentColor}
    d="M3.98 34.755c-.342 0-.648.062-.918.185a1.845 1.845 0 0 0-.68.538 2.426 2.426 0 0 0-.424.844c-.098.329-.146.7-.146 1.113 0 .554.078 1.03.234 1.431.156.397.394.703.713.918.319.212.722.318 1.21.318.303 0 .598-.03.885-.088.286-.059.582-.139.888-.24v.996c-.29.114-.582.197-.879.25a5.974 5.974 0 0 1-1.025.078c-.73 0-1.335-.152-1.817-.454a2.772 2.772 0 0 1-1.074-1.28c-.234-.55-.351-1.194-.351-1.933 0-.54.075-1.035.224-1.485.15-.449.368-.836.655-1.162.286-.329.64-.58 1.06-.757.422-.179.906-.268 1.45-.268.357 0 .709.04 1.054.122.348.078.67.19.967.337l-.41.967a6.01 6.01 0 0 0-.777-.303 2.794 2.794 0 0 0-.84-.127Zm7.963 3.53c0 .45-.058.848-.175 1.196a2.395 2.395 0 0 1-.513.884c-.225.238-.495.42-.81.547a2.912 2.912 0 0 1-1.07.186c-.371 0-.711-.062-1.02-.186a2.326 2.326 0 0 1-.806-.547 2.506 2.506 0 0 1-.523-.884 3.564 3.564 0 0 1-.185-1.196c0-.595.102-1.1.307-1.513a2.19 2.19 0 0 1 .89-.953c.383-.218.84-.327 1.371-.327.498 0 .938.11 1.318.327.381.218.68.536.894.953.215.416.322.92.322 1.513Zm-3.92 0c0 .394.047.731.141 1.01.098.28.247.496.45.645.201.147.462.22.78.22.32 0 .58-.073.782-.22.202-.15.35-.364.444-.644a3.18 3.18 0 0 0 .142-1.01c0-.395-.048-.728-.142-1.002a1.23 1.23 0 0 0-.444-.63c-.202-.146-.464-.22-.786-.22-.476 0-.822.16-1.04.48-.218.318-.328.776-.328 1.371Zm11.347-2.793c.606 0 1.061.156 1.367.469.31.312.464.814.464 1.504V41h-1.147v-3.33c0-.41-.08-.72-.24-.928-.16-.208-.402-.312-.727-.312-.456 0-.785.146-.986.44-.199.289-.298.71-.298 1.264V41h-1.148v-3.33c0-.273-.036-.501-.107-.684a.8.8 0 0 0-.317-.415.966.966 0 0 0-.543-.141c-.315 0-.568.071-.756.215-.186.143-.32.354-.4.634a3.668 3.668 0 0 0-.123 1.02V41h-1.147v-5.405h.893l.161.727h.064c.11-.189.247-.343.41-.464.166-.123.35-.214.552-.273.202-.062.412-.093.63-.093.403 0 .743.072 1.02.215.277.14.484.355.62.645h.088c.17-.293.405-.51.708-.65.303-.14.624-.21.962-.21Zm6.206 0c.641 0 1.156.235 1.543.703.39.47.586 1.166.586 2.09 0 .612-.091 1.128-.273 1.548-.18.417-.432.732-.757.947a2.008 2.008 0 0 1-1.128.318c-.274 0-.511-.036-.713-.108a1.78 1.78 0 0 1-.518-.278 1.983 1.983 0 0 1-.36-.38h-.07c.017.13.032.274.045.434.016.156.024.3.024.43v2.202h-1.152v-7.803h.937l.161.747h.054c.101-.153.223-.295.366-.425a1.62 1.62 0 0 1 .528-.308c.208-.078.45-.117.727-.117Zm-.307.938c-.316 0-.57.063-.762.19-.189.124-.327.311-.415.562-.085.25-.13.564-.137.942v.161c0 .4.04.74.122 1.02.085.277.223.489.415.635.195.144.46.215.791.215.28 0 .511-.076.694-.23.185-.152.323-.37.415-.653a3.28 3.28 0 0 0 .136-1.002c0-.582-.104-1.035-.312-1.357-.205-.322-.521-.483-.947-.483Zm5.776 3.74c.15 0 .298-.013.444-.04.147-.028.28-.063.4-.102v.87a2.404 2.404 0 0 1-.492.141 3.314 3.314 0 0 1-.63.059c-.306 0-.581-.05-.826-.152a1.207 1.207 0 0 1-.58-.532c-.144-.25-.216-.597-.216-1.04v-2.905h-.737v-.513l.791-.405.376-1.157h.723v1.2h1.548v.875h-1.548v2.89c0 .274.068.477.205.61.137.134.317.2.542.2Zm4.097-4.678c.481 0 .895.1 1.24.298.345.199.61.48.796.845.185.364.278.8.278 1.308v.616h-3.608c.013.524.153.927.42 1.21.27.284.647.425 1.132.425.345 0 .655-.032.928-.097.277-.069.562-.168.855-.298v.932c-.27.127-.546.22-.826.279-.28.058-.615.088-1.005.088-.531 0-.998-.103-1.402-.308a2.25 2.25 0 0 1-.942-.928c-.225-.41-.337-.92-.337-1.528 0-.606.102-1.12.307-1.543.206-.423.494-.745.865-.967.37-.221.804-.332 1.299-.332Zm0 .864c-.362 0-.655.118-.88.352-.22.234-.35.578-.39 1.03h2.461a1.892 1.892 0 0 0-.137-.718 1.042 1.042 0 0 0-.39-.488c-.173-.117-.394-.176-.664-.176Z"
  />
  <Rect width={27} height={27} x={105.833} fill={AccentColor} rx={13.5} />
  <Path
    fill={TextColor}
    d="M122.958 19.5h-7.984v-1.68l2.867-2.898a42.97 42.97 0 0 0 1.391-1.485c.354-.4.609-.765.766-1.093.161-.328.242-.68.242-1.055 0-.453-.128-.792-.383-1.016-.25-.229-.586-.343-1.008-.343-.443 0-.872.101-1.289.304a6.64 6.64 0 0 0-1.305.868l-1.312-1.555c.328-.281.674-.547 1.039-.797.37-.25.797-.45 1.281-.602.49-.156 1.076-.234 1.758-.234.75 0 1.393.135 1.93.406.541.271.958.64 1.25 1.11.291.463.437.99.437 1.578 0 .63-.125 1.206-.375 1.726-.25.521-.614 1.037-1.094 1.547a31.556 31.556 0 0 1-1.718 1.696l-1.469 1.382v.11h4.976V19.5Z"
  />
  <Path
    fill={AccentColor}
    d="M88.771 41v-7.139h1.172V41H88.77Zm5.757-5.508c.609 0 1.082.158 1.42.474.343.312.513.815.513 1.509V41h-1.147v-3.31c0-.42-.086-.735-.259-.943-.172-.212-.44-.317-.8-.317-.525 0-.89.16-1.094.483-.202.322-.303.79-.303 1.402V41H91.71v-5.405h.894l.161.732h.064c.117-.189.262-.343.434-.464.176-.123.371-.216.586-.278.218-.062.444-.093.679-.093Zm6.24.977h-1.313V41h-1.148v-4.531h-.884v-.552l.884-.337v-.376c0-.459.072-.824.215-1.094.146-.27.355-.463.625-.58.273-.121.599-.181.977-.181.247 0 .473.02.678.063.205.04.378.085.518.137l-.298.869a3.796 3.796 0 0 0-.371-.098 1.898 1.898 0 0 0-.44-.048c-.26 0-.452.08-.576.244-.12.162-.18.4-.18.712v.367h1.313v.874Zm5.708 1.816c0 .45-.059.848-.176 1.196a2.4 2.4 0 0 1-.512.884 2.26 2.26 0 0 1-.811.547 2.912 2.912 0 0 1-1.069.186c-.371 0-.712-.062-1.021-.186a2.318 2.318 0 0 1-.805-.547 2.506 2.506 0 0 1-.523-.884 3.557 3.557 0 0 1-.185-1.196c0-.595.102-1.1.307-1.513a2.19 2.19 0 0 1 .889-.953c.384-.218.841-.327 1.372-.327.498 0 .937.11 1.318.327.381.218.679.536.894.953.215.416.322.92.322 1.513Zm-3.921 0c0 .394.047.731.142 1.01.097.28.247.496.449.645.202.147.462.22.781.22s.58-.073.781-.22c.202-.15.35-.364.445-.644.094-.28.141-.617.141-1.01 0-.395-.047-.728-.141-1.002a1.234 1.234 0 0 0-.445-.63c-.201-.146-.463-.22-.786-.22-.475 0-.822.16-1.04.48-.218.318-.327.776-.327 1.371Zm7.979-2.793a3.346 3.346 0 0 1 .576.054l-.108 1.074a1.445 1.445 0 0 0-.253-.044 2.68 2.68 0 0 0-.264-.014c-.205 0-.401.034-.586.102a1.38 1.38 0 0 0-.83.806 1.859 1.859 0 0 0-.122.703V41h-1.153v-5.405h.899l.156.952h.054a2.4 2.4 0 0 1 .4-.527c.16-.16.342-.287.547-.381.208-.098.436-.147.684-.147Zm7.685 0c.606 0 1.061.156 1.367.469.31.312.464.814.464 1.504V41h-1.147v-3.33c0-.41-.08-.72-.239-.928-.16-.208-.402-.312-.728-.312-.456 0-.784.146-.986.44-.199.289-.298.71-.298 1.264V41h-1.148v-3.33c0-.273-.035-.501-.107-.684a.798.798 0 0 0-.317-.415.968.968 0 0 0-.542-.141c-.316 0-.568.071-.757.215-.186.143-.319.354-.401.634a3.679 3.679 0 0 0-.122 1.02V41h-1.147v-5.405h.893l.162.727h.063c.111-.189.247-.343.41-.464.166-.123.35-.214.552-.273.202-.062.412-.093.63-.093.403 0 .744.072 1.02.215.277.14.484.355.62.645h.088c.17-.293.406-.51.708-.65.303-.14.624-.21.962-.21Zm5.552 0c.684 0 1.2.152 1.548.454.351.303.527.775.527 1.416V41h-.815l-.22-.767h-.039a2.784 2.784 0 0 1-.474.484 1.642 1.642 0 0 1-.566.283c-.212.065-.47.098-.776.098a2.04 2.04 0 0 1-.865-.176 1.37 1.37 0 0 1-.6-.547c-.147-.244-.22-.553-.22-.928 0-.556.207-.975.62-1.255.417-.28 1.045-.434 1.885-.464l.937-.034v-.283c0-.374-.088-.641-.263-.8-.173-.16-.417-.24-.733-.24-.27 0-.532.04-.786.117a5.54 5.54 0 0 0-.742.288l-.371-.81a4.17 4.17 0 0 1 .898-.342c.339-.088.69-.132 1.055-.132Zm.937 2.925-.698.024c-.573.02-.975.118-1.206.293a.858.858 0 0 0-.346.723c0 .267.079.462.239.586.159.12.369.18.63.18.397 0 .726-.112.986-.336.264-.228.395-.562.395-1.001v-.469Zm4.756 1.753a2.547 2.547 0 0 0 .845-.142v.87a2.4 2.4 0 0 1-.493.141 3.317 3.317 0 0 1-.63.059c-.306 0-.581-.05-.825-.152a1.207 1.207 0 0 1-.581-.532c-.143-.25-.215-.597-.215-1.04v-2.905h-.737v-.513l.791-.405.376-1.157h.722v1.2h1.548v.875h-1.548v2.89c0 .274.069.477.205.61.137.134.318.2.542.2Zm3.091-4.575V41h-1.147v-5.405h1.147Zm-.566-2.07c.176 0 .327.047.454.141.13.094.195.257.195.488 0 .228-.065.39-.195.489a.739.739 0 0 1-.454.141.755.755 0 0 1-.464-.141c-.124-.098-.186-.26-.186-.489 0-.23.062-.394.186-.488a.755.755 0 0 1 .464-.142Zm6.997 4.76c0 .45-.059.848-.176 1.196a2.388 2.388 0 0 1-.513.884c-.224.238-.494.42-.81.547a2.913 2.913 0 0 1-1.07.186 2.72 2.72 0 0 1-1.02-.186 2.331 2.331 0 0 1-.806-.547 2.519 2.519 0 0 1-.522-.884 3.556 3.556 0 0 1-.186-1.196c0-.595.103-1.1.308-1.513.208-.417.504-.735.889-.953.384-.218.841-.327 1.372-.327.498 0 .937.11 1.318.327.381.218.679.536.894.953.214.416.322.92.322 1.513Zm-3.921 0c0 .394.047.731.142 1.01.097.28.247.496.449.645.202.147.462.22.781.22s.579-.073.781-.22c.202-.15.35-.364.445-.644.094-.28.141-.617.141-1.01 0-.395-.047-.728-.141-1.002a1.234 1.234 0 0 0-.445-.63c-.202-.146-.464-.22-.786-.22-.475 0-.822.16-1.04.48-.218.318-.327.776-.327 1.371Zm8.057-2.793c.608 0 1.082.158 1.42.474.342.312.513.815.513 1.509V41h-1.147v-3.31c0-.42-.087-.735-.259-.943-.173-.212-.44-.317-.801-.317-.524 0-.889.16-1.094.483-.201.322-.302.79-.302 1.402V41h-1.148v-5.405h.894l.161.732h.063c.118-.189.262-.343.435-.464.176-.123.371-.216.586-.278.218-.062.444-.093.679-.093Zm7.172 3.965c0 .355-.086.654-.258.898-.173.245-.425.43-.757.557-.329.124-.733.186-1.211.186a4.99 4.99 0 0 1-.977-.083 3.34 3.34 0 0 1-.766-.245v-.99c.257.12.545.224.864.312.322.088.627.132.913.132.378 0 .649-.059.815-.176a.565.565 0 0 0 .147-.791c-.065-.095-.189-.19-.371-.288a7.104 7.104 0 0 0-.791-.362 6.554 6.554 0 0 1-.864-.41 1.508 1.508 0 0 1-.533-.493c-.12-.195-.18-.444-.18-.747 0-.479.189-.841.566-1.089.381-.25.884-.376 1.509-.376a4.473 4.473 0 0 1 1.807.39l-.362.865a5.406 5.406 0 0 0-.737-.264 2.64 2.64 0 0 0-.747-.107c-.296 0-.523.046-.679.137a.43.43 0 0 0-.229.39.48.48 0 0 0 .112.323c.075.087.203.175.386.263.185.088.442.197.771.327.322.124.601.254.835.391.238.133.42.298.547.493.127.195.19.448.19.757Z"
  />
  <Rect width={27} height={27} x={206.167} fill={AccentColor} rx={13.5} />
  <Path
    fill={TextColor}
    d="M222.846 10.633c0 .526-.109.982-.328 1.367-.219.385-.516.7-.891.945a3.958 3.958 0 0 1-1.25.54v.046c.917.115 1.612.396 2.086.844.48.448.719 1.047.719 1.797a3.31 3.31 0 0 1-.492 1.789c-.323.526-.823.94-1.5 1.242-.677.302-1.55.453-2.617.453-.63 0-1.219-.052-1.766-.156a6.96 6.96 0 0 1-1.531-.46v-2.056c.489.25 1.002.44 1.539.57a6.627 6.627 0 0 0 1.5.188c.865 0 1.469-.148 1.812-.445.349-.302.524-.724.524-1.266a1.32 1.32 0 0 0-.242-.804c-.162-.22-.443-.386-.844-.5-.396-.115-.951-.172-1.664-.172h-.867v-1.852h.883c.703 0 1.236-.065 1.601-.195.37-.136.62-.318.75-.547.135-.234.203-.5.203-.797 0-.406-.125-.724-.375-.953-.25-.23-.666-.344-1.25-.344-.364 0-.698.047-1 .14a4.166 4.166 0 0 0-.804.329c-.24.125-.451.247-.633.367l-1.117-1.664a6.248 6.248 0 0 1 1.57-.805c.604-.213 1.323-.32 2.156-.32 1.177 0 2.109.237 2.797.711.687.474 1.031 1.143 1.031 2.008Z"
  />
  <Path
    fill={AccentColor}
    d="M208.209 33.861v4.62c0 .497-.105.944-.317 1.337a2.267 2.267 0 0 1-.947.938c-.423.228-.956.342-1.597.342-.915 0-1.611-.24-2.09-.718-.475-.482-.713-1.122-.713-1.92v-4.599h1.172v4.497c0 .596.14 1.036.42 1.319.28.283.698.425 1.255.425.384 0 .697-.067.938-.2a1.23 1.23 0 0 0 .537-.596c.117-.264.175-.581.175-.953v-4.492h1.167Zm4.527 1.631c.609 0 1.082.158 1.421.474.342.312.512.815.512 1.509V41h-1.147v-3.31c0-.42-.086-.735-.259-.943-.172-.212-.439-.317-.801-.317-.524 0-.888.16-1.093.483-.202.322-.303.79-.303 1.402V41h-1.148v-5.405h.894l.161.732h.064c.117-.189.262-.343.434-.464.176-.123.371-.216.586-.278.218-.062.444-.093.679-.093Zm4.687.103V41h-1.147v-5.405h1.147Zm-.566-2.07c.176 0 .327.047.454.141.13.094.195.257.195.488 0 .228-.065.39-.195.489a.739.739 0 0 1-.454.141.757.757 0 0 1-.464-.141c-.124-.098-.185-.26-.185-.489 0-.23.061-.394.185-.488a.757.757 0 0 1 .464-.142Zm5.845 5.932c0 .355-.087.654-.259.898-.173.245-.425.43-.757.557-.329.124-.732.186-1.211.186-.378 0-.703-.028-.976-.083a3.333 3.333 0 0 1-.767-.245v-.99c.257.12.545.224.864.312.322.088.627.132.913.132.378 0 .65-.059.816-.176a.564.564 0 0 0 .249-.479.504.504 0 0 0-.103-.312c-.065-.095-.189-.19-.371-.288a7.104 7.104 0 0 0-.791-.362 6.554 6.554 0 0 1-.864-.41 1.496 1.496 0 0 1-.532-.493c-.121-.195-.181-.444-.181-.747 0-.479.189-.841.566-1.089.381-.25.884-.376 1.509-.376a4.464 4.464 0 0 1 1.807.39l-.362.865a5.359 5.359 0 0 0-.737-.264 2.64 2.64 0 0 0-.747-.107c-.296 0-.522.046-.679.137a.43.43 0 0 0-.229.39.48.48 0 0 0 .112.323c.075.087.204.175.386.263.185.088.443.197.771.327.323.124.601.254.835.391.238.133.42.298.547.493.127.195.191.448.191.757Zm3.252.713a2.544 2.544 0 0 0 .844-.142v.87a2.4 2.4 0 0 1-.493.141 3.317 3.317 0 0 1-.63.059c-.306 0-.581-.05-.825-.152a1.207 1.207 0 0 1-.581-.532c-.143-.25-.215-.597-.215-1.04v-2.905h-.737v-.513l.791-.405.376-1.157h.723v1.2h1.547v.875h-1.547v2.89c0 .274.068.477.205.61.136.134.317.2.542.2Zm4.682-4.678a3.328 3.328 0 0 1 .576.054l-.107 1.074a1.441 1.441 0 0 0-.254-.044 2.663 2.663 0 0 0-.264-.014c-.205 0-.4.034-.586.102a1.393 1.393 0 0 0-.83.806 1.879 1.879 0 0 0-.122.703V41h-1.152v-5.405h.898l.157.952h.053c.108-.192.241-.368.401-.527.159-.16.342-.287.547-.381.208-.098.436-.147.683-.147Zm3.697 0c.683 0 1.199.152 1.547.454.352.303.528.775.528 1.416V41h-.816l-.219-.767h-.04c-.152.196-.31.357-.473.484a1.656 1.656 0 0 1-.567.283c-.211.065-.47.098-.776.098a2.04 2.04 0 0 1-.864-.176 1.377 1.377 0 0 1-.601-.547c-.146-.244-.219-.553-.219-.928 0-.556.206-.975.62-1.255.416-.28 1.045-.434 1.884-.464l.938-.034v-.283c0-.374-.088-.641-.264-.8-.172-.16-.416-.24-.732-.24-.27 0-.532.04-.786.117a5.553 5.553 0 0 0-.743.288l-.371-.81c.264-.14.564-.254.899-.342.338-.088.69-.132 1.055-.132Zm.937 2.925-.698.024c-.573.02-.975.118-1.206.293a.859.859 0 0 0-.347.723c0 .267.08.462.239.586.16.12.37.18.63.18.397 0 .726-.112.987-.336.263-.228.395-.562.395-1.001v-.469Z"
  />
  <Rect width={27} height={27} x={306.5} fill={AccentColor} rx={13.5} />
  <Path
    fill={TextColor}
    d="M323.883 17.133h-1.375V19.5h-2.36v-2.367h-4.875v-1.68l5.008-7.375h2.227v7.18h1.375v1.875Zm-3.735-1.875V13.32c0-.182.003-.398.008-.648l.032-.75c.01-.25.02-.472.031-.664l.031-.414h-.062c-.099.213-.204.422-.313.625a8.674 8.674 0 0 1-.383.625l-2.094 3.164h2.75Z"
  />
  <Path
    fill={AccentColor}
    d="M299.424 34.755a2.18 2.18 0 0 0-.918.185 1.85 1.85 0 0 0-.679.538 2.442 2.442 0 0 0-.425.844c-.097.329-.146.7-.146 1.113 0 .554.078 1.03.234 1.431.156.397.394.703.713.918.319.212.723.318 1.211.318.303 0 .597-.03.884-.088.286-.059.583-.139.889-.24v.996c-.29.114-.583.197-.879.25a5.983 5.983 0 0 1-1.026.078c-.729 0-1.334-.152-1.816-.454a2.765 2.765 0 0 1-1.074-1.28c-.235-.55-.352-1.194-.352-1.933 0-.54.075-1.035.225-1.485.149-.449.367-.836.654-1.162.286-.329.64-.58 1.06-.757.423-.179.906-.268 1.45-.268.358 0 .709.04 1.054.122.349.078.671.19.967.337l-.41.967a5.993 5.993 0 0 0-.776-.303 2.798 2.798 0 0 0-.84-.127Zm7.964 3.53c0 .45-.059.848-.176 1.196a2.388 2.388 0 0 1-.513.884c-.224.238-.495.42-.81.547a2.917 2.917 0 0 1-1.07.186 2.72 2.72 0 0 1-1.02-.186 2.331 2.331 0 0 1-.806-.547 2.504 2.504 0 0 1-.522-.884 3.556 3.556 0 0 1-.186-1.196c0-.595.103-1.1.308-1.513.208-.417.504-.735.888-.953.385-.218.842-.327 1.373-.327.498 0 .937.11 1.318.327.381.218.679.536.893.953.215.416.323.92.323 1.513Zm-3.921 0c0 .394.047.731.141 1.01.098.28.248.496.45.645.201.147.462.22.781.22s.579-.073.781-.22c.202-.15.35-.364.444-.644.095-.28.142-.617.142-1.01 0-.395-.047-.728-.142-1.002a1.227 1.227 0 0 0-.444-.63c-.202-.146-.464-.22-.786-.22-.475 0-.822.16-1.04.48-.218.318-.327.776-.327 1.371Zm8.056-2.793c.609 0 1.083.158 1.421.474.342.312.513.815.513 1.509V41h-1.147v-3.31c0-.42-.087-.735-.259-.943-.173-.212-.44-.317-.801-.317-.524 0-.889.16-1.094.483-.202.322-.302.79-.302 1.402V41h-1.148v-5.405h.894l.161.732h.063c.117-.189.262-.343.435-.464.176-.123.371-.216.586-.278a2.47 2.47 0 0 1 .678-.093Zm5.357 5.606c-.645 0-1.162-.235-1.553-.703-.387-.473-.581-1.168-.581-2.085 0-.928.197-1.63.591-2.105.397-.475.92-.713 1.567-.713.274 0 .513.038.718.113.205.071.381.169.527.293.15.123.277.261.381.414h.054a12.82 12.82 0 0 1-.059-.434 5.44 5.44 0 0 1-.029-.532v-1.944h1.152V41h-.898l-.205-.737h-.049a1.72 1.72 0 0 1-.898.723 2.067 2.067 0 0 1-.718.112Zm.322-.933c.492 0 .838-.142 1.04-.425.202-.283.306-.708.313-1.274v-.151c0-.606-.098-1.07-.293-1.392-.196-.326-.552-.488-1.07-.488-.413 0-.729.167-.947.502-.215.333-.322.796-.322 1.392 0 .596.107 1.051.322 1.367.218.313.537.469.957.469Zm5.239-4.57V41h-1.147v-5.405h1.147Zm-.566-2.07c.176 0 .327.047.454.141.13.094.195.257.195.488 0 .228-.065.39-.195.489a.739.739 0 0 1-.454.141.757.757 0 0 1-.464-.141c-.124-.098-.185-.26-.185-.489 0-.23.061-.394.185-.488a.757.757 0 0 1 .464-.142Zm4.224 6.645a2.544 2.544 0 0 0 .844-.142v.87a2.4 2.4 0 0 1-.493.141 3.317 3.317 0 0 1-.63.059c-.306 0-.581-.05-.825-.152a1.207 1.207 0 0 1-.581-.532c-.143-.25-.215-.597-.215-1.04v-2.905h-.737v-.513l.791-.405.376-1.157h.723v1.2h1.547v.875h-1.547v2.89c0 .274.068.477.205.61.136.134.317.2.542.2Zm6.728-1.885c0 .45-.058.848-.176 1.196a2.4 2.4 0 0 1-.512.884 2.26 2.26 0 0 1-.811.547 2.912 2.912 0 0 1-1.069.186 2.73 2.73 0 0 1-1.021-.186 2.318 2.318 0 0 1-.805-.547 2.506 2.506 0 0 1-.523-.884 3.557 3.557 0 0 1-.185-1.196c0-.595.102-1.1.307-1.513.209-.417.505-.735.889-.953.384-.218.841-.327 1.372-.327.498 0 .937.11 1.318.327.381.218.679.536.894.953.215.416.322.92.322 1.513Zm-3.921 0c0 .394.047.731.142 1.01.098.28.247.496.449.645.202.147.462.22.781.22s.58-.073.782-.22c.201-.15.35-.364.444-.644.094-.28.142-.617.142-1.01a3.1 3.1 0 0 0-.142-1.002 1.233 1.233 0 0 0-.444-.63c-.202-.146-.464-.22-.787-.22-.475 0-.822.16-1.04.48-.218.318-.327.776-.327 1.371Zm8.057-2.793c.609 0 1.082.158 1.421.474.342.312.512.815.512 1.509V41h-1.147v-3.31c0-.42-.086-.735-.259-.943-.172-.212-.439-.317-.801-.317-.524 0-.888.16-1.093.483-.202.322-.303.79-.303 1.402V41h-1.147v-5.405h.893l.161.732h.064c.117-.189.262-.343.434-.464.176-.123.371-.216.586-.278.218-.062.445-.093.679-.093Zm7.173 3.965c0 .355-.087.654-.259.898-.173.245-.425.43-.757.557-.329.124-.732.186-1.211.186-.377 0-.703-.028-.976-.083a3.333 3.333 0 0 1-.767-.245v-.99c.257.12.545.224.864.312.323.088.627.132.913.132.378 0 .65-.059.816-.176a.564.564 0 0 0 .249-.479.504.504 0 0 0-.103-.312c-.065-.095-.189-.19-.371-.288a7.104 7.104 0 0 0-.791-.362 6.554 6.554 0 0 1-.864-.41 1.505 1.505 0 0 1-.532-.493c-.121-.195-.181-.444-.181-.747 0-.479.189-.841.566-1.089.381-.25.884-.376 1.509-.376a4.464 4.464 0 0 1 1.807.39l-.361.865a5.418 5.418 0 0 0-.738-.264 2.64 2.64 0 0 0-.747-.107c-.296 0-.522.046-.679.137a.43.43 0 0 0-.229.39.48.48 0 0 0 .112.323c.075.087.204.175.386.263.186.088.443.197.771.327.323.124.601.254.835.391.238.133.42.298.547.493.127.195.191.448.191.757Z"
  />
</Svg>
)
export default Step4
